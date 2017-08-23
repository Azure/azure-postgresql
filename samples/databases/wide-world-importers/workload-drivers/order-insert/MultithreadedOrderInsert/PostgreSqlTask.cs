using System;
using Npgsql;
using NpgsqlTypes;
using MultithreadedInMemoryTableInsert;

namespace MultithreadedOrderInsert
{
    class PostgreSqlTask : SqlTasks
    {
        public PostgreSqlTask(int TaskNumber, MultithreadedOrderInsertMain ParentForm, string ConnectionString)
            : base(TaskNumber, ParentForm, ConnectionString)
        {

        }

        public override void PerformSqlTask()
        {
            OrderList[] orderTable;
            OrderLineList[] orderLinesTable;

            DateTime startingTime;
            Random rnd;

            string salespersonID;

            int arrPos1 = 0;
            int arrPos2 = 0;

            try
            {
                using (var con = new NpgsqlConnection(_connectionstring))
                {
                    con.Open();

                    // Since we are working with PG composite types, we need to make sure we map these types.
                    // We also need to make sure that the full path to the type is specified. i.e. "website.order_list"
                    con.MapComposite<OrderList>("website.order_list");
                    con.MapComposite<OrderLineList>("website.order_line_list");

                    while (!_erroroccurred)
                    {
                        try
                        {
                            startingTime = DateTime.Now;
                            rnd = new Random();

                            using (var selectCommand = new NpgsqlCommand("SELECT person_id FROM application.people WHERE is_employee <> false ORDER BY random() LIMIT 1;", con))
                            {
                                using (var reader = selectCommand.ExecuteReader())
                                {
                                    reader.Read();
                                    salespersonID = reader.GetValue(0).ToString();
                                }
                            }

                            using (var selectCommand = new NpgsqlCommand("SELECT 1 AS order_reference, c.customer_id, c.primary_contact_person_id AS contact_person_id,current_date + 1 AS expected_delivery_date,cast(floor(random() * 10000) + 1 as varchar(20)) AS customer_purchase_order_number,false AS is_undersupply_backordered,'Auto-generated' AS comments,c.delivery_address_line_1 || ', ' || c.delivery_address_line_2 AS delivery_instructions FROM sales.customers AS c OFFSET floor(random() * (SELECT count(1) FROM sales.customers)) LIMIT 1;", con))
                            {
                                using (var reader = selectCommand.ExecuteReader())
                                {
                                    reader.Read();

                                    orderTable = new OrderList[1];

                                    orderTable[arrPos1++] = new OrderList
                                    {
                                        OrderReference = (int)reader.GetValue(0),
                                        CustomerId = (int)reader.GetValue(1),
                                        ContactPersonId = (int)reader.GetValue(2),
                                        ExpectedDeliveryDate = (DateTime)reader.GetValue(3),
                                        CustomerPurchaseOrderNumber = (string)reader.GetValue(4),
                                        IsUndersupplyBackordered = (bool)reader.GetValue(5),
                                        Comments = (string)reader.GetValue(6),
                                        DeliveryInstructions = (string)reader.GetValue(7)
                                    };
                                }
                            }

                            using (var selectCommand = new NpgsqlCommand(@"WITH si AS
                                                                (
                                                                SELECT random() as rand1,
                                                                        random() as rand2,
                                                                        stock_item_id,
                                                                        stock_item_name,
                                                                            is_chiller_stock
                                                                FROM warehouse.stock_items
                                                                ),
                                                                si1 AS
                                                                (
                                                                SELECT 1 AS order_reference,
                                                                        si.stock_item_id,
                                                                        si.stock_item_name AS description,
                                                                        floor(rand1 * 10) + 1 AS quantity
                                                                FROM si
                                                                WHERE is_chiller_stock = false
                                                                ORDER BY rand2
                                                                LIMIT 7
                                                                ),
                                                                si2 AS
                                                                (
                                                                SELECT 1 AS order_reference,
                                                                        si.stock_item_id,
                                                                        si.stock_item_name AS description,
                                                                        floor(rand1 * 10) + 1 AS quantity
                                                                FROM si
                                                                WHERE is_chiller_stock = true
                                                                    AND
                                                                true = :boolvalue
                                                                ORDER BY rand2
                                                                LIMIT 1
                                                                )
                                                                SELECT *
                                                                FROM si1
                                                                UNION ALL
                                                                SELECT *
                                                                FROM si2; ", con))
                            {
                                NpgsqlDataReader reader;

                                if (rnd.Next(1, 100) < 4)
                                {
                                    selectCommand.Parameters.Add(new NpgsqlParameter("boolvalue", NpgsqlDbType.Boolean) { Value = "true" });

                                    reader = selectCommand.ExecuteReader();

                                    orderLinesTable = new OrderLineList[8];
                                }

                                else
                                {
                                    selectCommand.Parameters.Add(new NpgsqlParameter("boolvalue", NpgsqlDbType.Boolean) { Value = "false" });

                                    reader = selectCommand.ExecuteReader();

                                    orderLinesTable = new OrderLineList[7];
                                }

                                while (reader.Read())
                                {
                                    orderLinesTable[arrPos2++] = new OrderLineList
                                    {
                                        OrderReference = (int)reader.GetValue(0),
                                        StockItemId = (int)reader.GetValue(1),
                                        Description = (string)reader.GetValue(2),
                                        Quantity = Convert.ToInt32(reader.GetValue(3))
                                    };
                                }

                                reader.Close();
                            }

                            using (var insertCommand = new NpgsqlCommand("select website.insert_customer_orders(@p1::website.order_list[],@p2::website.order_line_list[],@p3,@p4)", con))
                            {

                                insertCommand.Parameters.Add(new NpgsqlParameter("p1", NpgsqlDbType.Composite)
                                {
                                    Value = orderTable,
                                    SpecificType = typeof(OrderList[])
                                });


                                insertCommand.Parameters.Add(new NpgsqlParameter("p2", NpgsqlDbType.Composite)
                                {
                                    Value = orderLinesTable,
                                    SpecificType = typeof(OrderLineList[])
                                });

                                insertCommand.Parameters.AddWithValue("p3", Convert.ToInt32(salespersonID));

                                insertCommand.Parameters.AddWithValue("p4", Convert.ToInt32(salespersonID));

                                insertCommand.ExecuteNonQuery();
                            }

                            _parentform.UpdateTotals((int)DateTime.Now.Subtract(startingTime).TotalMilliseconds);
                        }
                        catch (Exception ex)
                        {
                            HandleException(ex);
                        }

                        // reset array positions
                        arrPos1 = 0;
                        arrPos2 = 0;
                    }
                }
            }
            catch (Exception ex)
            {
                HandleException(ex);
            }
        }
    }
}

/// <summary>
/// This is the PG type for order_list and we need to make sure that the type name is in PascalCase format. The NpgsqlSnakeCaseNameTranslator will translate it to snake_case.
/// This also show an example on how you can decorate each parameter with [PgName("parameter_name")] to override the NpgsqlSnakeCaseNameTranslator.
/// </summary>
public class OrderList
{
    [PgName("order_reference")]
    public Int32 OrderReference { get; set; }
    [PgName("customer_id")]
    public Int32 CustomerId { get; set; }
    [PgName("contact_person_id")]
    public Int32 ContactPersonId { get; set; }
    [PgName("expected_delivery_date")]
    public DateTime ExpectedDeliveryDate { get; set; }
    [PgName("customer_purchase_order_number")]
    public string CustomerPurchaseOrderNumber { get; set; }
    [PgName("is_undersupply_backordered")]
    public bool IsUndersupplyBackordered { get; set; }
    [PgName("comments")]
    public string Comments { get; set; }
    [PgName("delivery_instructions")]
    public string DeliveryInstructions { get; set; }
}

/// <summary>
/// This is the PG type for order_list and we need to make sure that the type name is in PascalCase format. The NpgsqlSnakeCaseNameTranslator will translate it to snake_case.
/// This also show an example on how you can use PascalCase and the NpgsqlSnakeCaseNameTranslator will translate to camel_case. i.e. "OrderLineId" becomes "order_line_id".
/// </summary>
public class OrderLineList
{
    public int OrderReference { get; set; }
    public int StockItemId { get; set; }
    public string Description { get; set; }
    public int Quantity { get; set; }
}

