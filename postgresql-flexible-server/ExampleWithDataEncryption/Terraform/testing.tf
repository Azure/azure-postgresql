resource "azapi_resource" "flexibleServer" {
  depends_on = [azurerm_private_dns_zone_virtual_network_link.test]
  type      = "Microsoft.DBforPostgreSQL/flexibleServers@2022-12-01"
  name      = "acctest7002"
  parent_id = azurerm_resource_group.test.id

  body = jsonencode({
    identity = {
      type = "UserAssigned"
      userAssignedIdentities = zipmap([azurerm_user_assigned_identity.test.id],[{}])
    }
    location = azurerm_resource_group.test.location
    properties = {
      administratorLogin         = "cloudsa"
      administratorLoginPassword = "password"
      availabilityZone           = "1"
      backup = {
        backupRetentionDays = 7
        geoRedundantBackup  = "Disabled"
      }
      createMode = "Create"
      dataEncryption = {
        primaryKeyURI                 = azurerm_key_vault_key.test.id
        primaryUserAssignedIdentityId = azurerm_user_assigned_identity.test.id
        type                          = "AzureKeyVault"
      }
      highAvailability = {
        mode = "ZoneRedundant"
      }
      network = {
        delegatedSubnetResourceId   = azurerm_subnet.test.id
        privateDnsZoneArmResourceId = azurerm_private_dns_zone.test.id
      }
      storage = {
        storageSizeGB = 512
      }
      version = "12"
    }
    sku = {
      name = "Standard_D4s_v3"
      tier = "GeneralPurpose"
    }
    tags = {
      ElasticServer = "1"
    }
  })

  schema_validation_enabled = false
  ignore_missing_property   = false
}
