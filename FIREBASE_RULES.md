# Regras do Firebase Realtime Database

Cole estas regras em:
Firebase Console → Realtime Database → Regras

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

Estas regras permitem acesso durante o período de teste (30 dias).
Para produção, configure autenticação Firebase Auth.
