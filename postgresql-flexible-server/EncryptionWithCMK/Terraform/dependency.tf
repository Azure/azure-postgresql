data "azurerm_client_config" "current" {}

resource "azurerm_resource_group" "test" {
  name     = "pgflex-tf-resourcegroup3"
  location = "eastus"
}

resource "azurerm_user_assigned_identity" "test" {
  location            = "eastus"
  name                = "tf-umi-eastus-3"
  resource_group_name = azurerm_resource_group.test.name
}

resource "azurerm_user_assigned_identity" "testgeo" {
  location            = "westus"
  name                = "tf-umi-westus-3"
  resource_group_name = azurerm_resource_group.test.name
}

resource "azurerm_key_vault" "test" {
  name                        = "tf-keyvault-eastus-3"
  location                    = "eastus"
  resource_group_name         = azurerm_resource_group.test.name
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  soft_delete_retention_days  = 7
  purge_protection_enabled    = true
  sku_name                    = "standard"

  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id

    key_permissions     = [
      "Get",
      "List",
      "Create",
      "Update",
      "GetRotationPolicy",
      "Delete",
    ]

    secret_permissions  = []

    storage_permissions = []
  }
}

resource "azurerm_key_vault" "testgeo" {
  name                        = "tf-keyvault-westus-3"
  location                    = "westus"
  resource_group_name         = azurerm_resource_group.test.name
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  soft_delete_retention_days  = 7
  purge_protection_enabled    = true
  sku_name                    = "standard"

  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id

    key_permissions     = [
      "Get",
      "List",
      "Create",
      "Update",
      "GetRotationPolicy",
      "Delete",
    ]

    secret_permissions  = []

    storage_permissions = []
  }
}

resource "azurerm_key_vault_access_policy" "test" {
  key_vault_id = azurerm_key_vault.test.id
  tenant_id    = data.azurerm_client_config.current.tenant_id
  object_id    = azurerm_user_assigned_identity.test.principal_id

  key_permissions = [
    "Get",
    "List",
    "WrapKey",
    "UnwrapKey",
  ]

  secret_permissions = []
}

resource "azurerm_key_vault_access_policy" "testgeo" {
  key_vault_id = azurerm_key_vault.testgeo.id
  tenant_id    = data.azurerm_client_config.current.tenant_id
  object_id    = azurerm_user_assigned_identity.testgeo.principal_id

  key_permissions = [
    "Get",
    "List",
    "WrapKey",
    "UnwrapKey",
  ]

  secret_permissions = []
}

resource "azurerm_key_vault_key" "testkey" {
  name         = "tf-kv-key-eastus-3"
  key_vault_id = azurerm_key_vault.test.id
  key_type     = "RSA"
  key_size     = 2048

  key_opts = [
    "decrypt",
    "encrypt",
    "sign",
    "unwrapKey",
    "verify",
    "wrapKey",
  ]

  depends_on = [ azurerm_key_vault_access_policy.test ]
}

resource "azurerm_key_vault_key" "testgeokey" {
  name         = "tf-kv-key-westus-3"
  key_vault_id = azurerm_key_vault.testgeo.id
  key_type     = "RSA"
  key_size     = 2048

  key_opts = [
    "decrypt",
    "encrypt",
    "sign",
    "unwrapKey",
    "verify",
    "wrapKey",
  ]

  depends_on = [ azurerm_key_vault_access_policy.testgeo ]
}
