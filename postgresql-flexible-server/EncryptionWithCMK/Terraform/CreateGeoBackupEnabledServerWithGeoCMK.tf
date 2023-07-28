
resource "azurerm_postgresql_flexible_server" "flexibleServer" {
  name                    = "pgflex-tf-test-geo-with-cmk-3"
  resource_group_name     = azurerm_resource_group.test.name
  location                = "eastus"

  version                 = "15"
  administrator_login     = "cloudsa"
  administrator_password  = "password"
  zone                    = "1"

  storage_mb              = 32768
  sku_name                = "GP_Standard_D2ds_v4"

  high_availability {
    mode = "ZoneRedundant"
  }

  identity {
    type = "UserAssigned"
    identity_ids = [azurerm_user_assigned_identity.test.id, azurerm_user_assigned_identity.testgeo.id]
  }

  customer_managed_key {
    primary_user_assigned_identity_id     = azurerm_user_assigned_identity.test.id
    key_vault_key_id                      = azurerm_key_vault_key.testkey.id
    geo_backup_user_assigned_identity_id  = azurerm_user_assigned_identity.testgeo.id
    geo_backup_key_vault_key_id           = azurerm_key_vault_key.testgeokey.id
  }

  geo_redundant_backup_enabled  = true
  backup_retention_days         = "7"
  
  depends_on = [ azurerm_key_vault_key.testkey, azurerm_key_vault_key.testgeokey ]
}
