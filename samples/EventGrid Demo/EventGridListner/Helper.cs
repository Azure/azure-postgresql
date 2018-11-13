using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;

namespace EventGridListner
{
    public class Helper
    {
        
        public static string GetConnectionString()
        {
            return "<Pg connection string>";
                //Microsoft.Extensions.Configuration.ConfigurationExtensions.GetConnectionString(this.Configuration, "PgConnection");

        }

        public static NpgsqlConnection GetConnection()
        {
            return new NpgsqlConnection(GetConnectionString());
        }

        public static NpgsqlCommand GetCommand()
        {
            var connection = GetConnection();
            connection.Open();
            return connection.CreateCommand();
        }

        public static void ExecuteNonQuery(string query)
        {

            var command = GetCommand();
            command.CommandText = query;
            command.ExecuteNonQuery();
        }

        public static NpgsqlDataReader ExecuteReader(string query)
        {
            var command = GetCommand();
            command.CommandText = query;
            return command.ExecuteReader();
        }


       
    }
    public static class Utils
    {
        public static T Cast<T>(this Object myobj)
        {
            Type objectType = myobj.GetType();
            Type target = typeof(T);
            var x = Activator.CreateInstance(target, false);
            var z = from source in objectType.GetMembers().ToList()
                    where source.MemberType == MemberTypes.Property
                    select source;
            var d = from source in target.GetMembers().ToList()
                    where source.MemberType == MemberTypes.Property
                    select source;
            List<MemberInfo> members = d.Where(memberInfo => d.Select(c => c.Name)
               .ToList().Contains(memberInfo.Name)).ToList();
            PropertyInfo propertyInfo;
            object value;
            foreach (var memberInfo in members)
            {
                propertyInfo = typeof(T).GetProperty(memberInfo.Name);
                value = myobj.GetType().GetProperty(memberInfo.Name).GetValue(myobj, null);

                propertyInfo.SetValue(x, value, null);
            }
            return (T)x;
        }
        public static void CopyObject<T>(object sourceObject, ref T destObject)
        {
        
            if (sourceObject == null || destObject == null)
                return;

   
            Type sourceType = sourceObject.GetType();
            Type targetType = destObject.GetType();


            foreach (PropertyInfo p in sourceType.GetProperties())
            {

                PropertyInfo targetObj = targetType.GetProperty(p.Name);

                if (targetObj == null)
                    continue;

                targetObj.SetValue(destObject, p.GetValue(sourceObject, null), null);
            }
        }

    }
}