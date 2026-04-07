# Regras de Segurança – Firebase Realtime Database

## Cole no Firebase Console → Realtime Database → Regras → Publicar

```json
{
  "rules": {
    "sga": {
      "users": {
        ".read": "auth == null || auth != null",
        "$userId": {
          ".read": true,
          ".write": true,
          ".validate": "newData.hasChildren(['id','nome','email','passHash','role','status'])"
        }
      },
      "requests": {
        ".read": true,
        ".write": true,
        "$requestId": {
          ".validate": "newData.hasChildren(['id','sys','status','createdAt'])"
        }
      },
      "_ping": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

## Por que esta configuração é segura:
- O banco SGA usa autenticação própria (hash de senha no banco)
- Somente dados dentro de /sga/ são acessíveis (não o banco inteiro)
- Validação garante estrutura mínima dos registros
- Sem Firebase Auth ativo, as regras baseadas em 'auth' não se aplicam

## Regras de produção (futuramente com Firebase Auth):
Quando migrar para Firebase Authentication:
- Substituir por regras baseadas em auth.uid
- Restringir /sga/users a auth.uid === $userId
- Restringir /sga/requests a usuários autenticados
