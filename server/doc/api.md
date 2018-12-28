#GET

---

##/
####res:
> **JSON**

```
{
    status: number, 
    data: {
        message: string
    }
}
```

---

---

##/auth/emailExist?email={string}
####res:
> **JSON**

```
{
    status: number, 
    data: {
        message: string
    }
}
```

---

---

##/catalogs/list?limit={number}&skip={number}
####res:
> **JSON**

```
{
    status: number, 
    data: {
        message: string
    }
}
```

---

#POST

---

##/auth/registration

####req:

> **JSON**

```
{
    email: string, 
    password: string
}
```

####res:
>**JSON**

```
{
    status: number, 
    data: {
        message: string,
        token: string
    }
}
```

---

---

##/auth/login

####req:

> **JSON**

```
{
    email: string, 
    password: string
}
```

####res:
>**JSON**

```
{
    status: number, 
    data: {
        message: string,
        token: string
    }
}
```

---

---

##/catalogs/create

####req:

> **JSON**

```
{
    name: string
}
```

####res:
>**JSON**

```
{
    status: number,
    data: {
        message: string,
        catalog: {
            id: string,
            name: string,
            createDate: date
        }
    }
}
```

---

#PATCH

---

##/auth/confirm/

####req:
> **JSON**

```
{
    id: string
}
```

####res:
>**JSON**

```
{
    status: number, 
    data: {
        message: string
    }
}
```

---

---

##/catalogs/rename

####req:
> **JSON**

```
{
    catalogId: string,
    newName: string
}
```

####res:
>**JSON**

```
{
    status: 200,
    data: {
        message: string,
        catalog: {
            id: string,
            name: string
        }
    }
}
```

---

#DELETE

---

##/catalogs/delete

####req:
> **JSON**

```
{
    catalogId: string
}
```

####res:
>**JSON**

```
{
    status: 200,
    data: {
        message: string
    }
}
```

---