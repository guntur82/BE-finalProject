# Keltwoe Ponsel Apps

## Desain ERD

[![Keltwoe Ponsel App][erd-screenshot]](https://example.com)

## Database

```bash
npx sequelize-cli model:generate --name user --attributes name:string,no_hp:string,alamat:string

npx sequelize-cli model:generate --name brand --attributes name:string,homepage:string,logo:string

npx sequelize-cli model:generate --name item --attributes name:string,harga:integer,gambar:string,stock:integer,userId:integer,brandId:integer

npx sequelize-cli model:generate --name transaksi --attributes name:string,alamat:string,tanggal:string,jumlah:integer,total_harga:integer,itemId:integer

```

### End Point

| Method | Route                 | Keterangan                                          |
| ------ | --------------------- | --------------------------------------------------- |
| GET    | /brand                | Menampilkan semua brand yang ada dalam database     |
| POST   | /brand/create         | Melakukan _insertion_ brand ke dalam database       |
| POST   | /brand/update/:id     | Melakukan _update_ brand ke dalam database          |
| GET    | /brand/delete/:id     | Melakukan _delete_ brand di database                |
| GET    | /item                 | Menampilkan semua item yang ada dalam database      |
| POST   | /item/create          | Melakukan _insertion_ item ke dalam database        |
| POST   | /item/update/:id      | Melakukan _update_ item ke dalam database           |
| GET    | /item/delete/:id      | Melakukan _delete_ item di database                 |
| GET    | /user                 | Menampilkan semua user yang ada dalam database      |
| POST   | /user/create          | Melakukan _insertion_ user ke dalam database        |
| POST   | /user/update/:id      | Melakukan _update_ user ke dalam database           |
| GET    | /user/delete/:id      | Melakukan _delete_ user di database                 |
| GET    | /transaksi            | Menampilkan semua transaksi yang ada dalam database |
| POST   | /transaksi/create     | Melakukan _insertion_ transaksi ke dalam database   |
| POST   | /transaksi/update/:id | Melakukan _update_ transaksi ke dalam database      |
| GET    | /transaksi/delete/:id | Melakukan _delete_ transaksi di database            |

### Documentation

- GET '/brand'

```ssh
//req
localhost:3000/brand

//res
[
    {
        "id": 1,
        "name": "apple",
        "homepage": "apel jatuh",
        "logo": "apple",
        "createdAt": "2022-08-22T09:58:40.660Z",
        "updatedAt": "2022-08-22T10:08:57.702Z"
    }
]
```

- POST '/brand/create'

```ssh
//req
localhost:3000/brand/create
{
    "name": "samsung",
    "homepage": "test",
    "logo": "samsung"
}

//res
{
    "id": 1,
    "name": "samsung",
    "homepage": "test",
    "logo": "samsung",
    "updatedAt": "2022-08-22T09:58:40.660Z",
    "createdAt": "2022-08-22T09:58:40.660Z"
}
```

- POST '/brand/update/:id'

```ssh
//req
localhost:3000/brand/update/1
{
    "name": "apple",
    "homepage": "apel jatuh",
    "logo": "apple"
}

//res
[
    1
]
```

- POST '/brand/delete/:id'

```ssh
//req
localhost:3000/brand/delete/1

//res
1
```

- GET '/item'

```ssh
//req
localhost:3000/item

//res
[
    {
        "id": 1,
        "name": "samsung s10",
        "harga": 12000000,
        "gambar": "samsung pict",
        "stock": 10,
        "userId": 1,
        "brandId": 2,
        "createdAt": "2022-08-22T10:46:20.791Z",
        "updatedAt": "2022-08-22T10:46:20.791Z"
    }
]
```

- POST '/item/create'

```ssh
//req
localhost:3000/item/create
{
    "name" : "samsung s10",
    "harga" : "12000000",
    "gambar" : "samsung pict",
    "stock" : 10,
    "userId" : 1,
    "brandId" : 2
}

//res
{
    "id": 1,
    "name": "samsung s10",
    "harga": 12000000,
    "gambar": "samsung pict",
    "stock": 10,
    "userId": 1,
    "brandId": 2,
    "updatedAt": "2022-08-22T10:46:20.791Z",
    "createdAt": "2022-08-22T10:46:20.791Z"
}
```

- POST '/item/update/:id'

```ssh
//req
localhost:3000/item/update/1
{
    "name" : "samsung note 10",
    "harga" : "15000000",
    "gambar" : "samsung pict",
    "stock" : 15,
    "userId" : 1,
    "brandId" : 2
}

//res
[
    1
]
```

- GET '/item/delete/:id'

```ssh
//req
localhost:3000/item/delete/2

//res
1
```

- GET '/user'

```ssh
//req

//res
```

- POST '/user/create'

```ssh
//req
localhost:3000/user/create
{
    "name" : "udin",
    "no_hp" : "082123456789",
    "alamat" : "indonesia"
}

//res
{
    "id": 2,
    "name": "udin",
    "no_hp": "082123456789",
    "alamat": "indonesia",
    "updatedAt": "2022-08-23T05:10:53.628Z",
    "createdAt": "2022-08-23T05:10:53.628Z"
}
```

- POST '/user/update/:id'

```ssh
//req
localhost:3000/user/update/2
{
    "name" : "ucup",
    "no_hp" : "089876543210",
    "alamat" : "jawa barat"
}

//res
{
    "message": "id 2 has update"
}
```

- GET '/user/delete/:id'

```ssh
//req
localhost:3000/user/delete/2

//res
{
    "message": "id 2 deleted"
}
```

- GET '/transaksi'

```ssh
//req
localhost:3000/transaksi

//res
[
    {
        "id": 2,
        "name": "luffy",
        "alamat": "east blue",
        "tanggal": "25-08-2022",
        "jumlah": 2,
        "total_harga": 10000,
        "itemId": 1,
        "createdAt": "2022-08-24T17:50:28.806Z",
        "updatedAt": "2022-08-24T17:50:28.806Z"
    }
]
```

- POST '/transaksi/create'

```ssh
//req
localhost:3000/transaksi/create
{
    "name": "luffy",
    "alamat": "east blue",
    "tanggal": "25-08-2022",
    "jumlah" : 2,
    "total_harga" : 10000,
    "itemId" : 1

}

//res
{
    "id": 2,
    "name": "luffy",
    "alamat": "east blue",
    "tanggal": "25-08-2022",
    "jumlah": 2,
    "total_harga": 10000,
    "itemId": 1,
    "updatedAt": "2022-08-24T17:50:28.806Z",
    "createdAt": "2022-08-24T17:50:28.806Z"
}
```

- POST '/transaksi/update/:id'

```ssh
//req
localhost:3000/transaksi/update/2
{
    "name": "mugiwara",
    "alamat": "new world",
    "tanggal": "26-08-2022",
    "jumlah" : 3,
    "total_harga" : 12000,
    "itemId" : 1

}

//res
{
    "message": "id 2 has been updated!"
}
```

- GET '/transaksi/delete/:id '

```ssh
//req
localhost:3000/transaksi/delete/2

//res
{
    "message": "data from id 2 has been deleted!"
}
```

[erd-screenshot]: public/erd.png
