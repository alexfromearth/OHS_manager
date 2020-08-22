# OHS_manager

Это приложение поможет сотрудникам по охране труда в их нелегкой работе. Это CRM приложение, которое увеличит продуктивность и облегчит труд.

### QUICK START

> Склонируйте репозиторий и пропишите команды:


```shell
$ yarn i
$ yarn seed
```


### USAGE(optional)

### Step 1

> Запустите приложение с помощью команды: 

```shell
$ yarn dev
```

### Step 2

> На странице Login введите тестовый логин и пароль:

- login: croc@croc.io
- password: croc

### Step 3
![company](https://github.com/alexfromearth/OHS_manager/raw/master/readme-assets/company.png)

> Далее вы попадаете в основной экран приложения с боковым Drawerом 

### Step 4

![workers](https://github.com/alexfromearth/OHS_manager/raw/master/readme-assets/workers.png)

> Во вкладке "Сотрудники" находится основной функционал нашего приложения.

### Step Excel Seed


> Для того чтобы заполнить базу большим количеством сотрудников необходимо:

- Нажать на кнопку "Загрузить базу данных сотрудников"

- В появившееся модальное окно загрузить файл лежащий в папке `/excelTestSeed/Test.xlsx`

- Нажать кнопку "Начать загрузку"

![meds](https://github.com/alexfromearth/OHS_manager/raw/master/readme-assets/worker.png)

> После этого для каждого из добавленных сотрудников сгенерируются файлы шаблоны
> по охране труда в формате .docx которые в последствии можно скачать перейдя на: 
>
> `страницу сотрудника > документы` 


### Step Documents

![documents](https://github.com/alexfromearth/OHS_manager/raw/master/readme-assets/docs.png)


> Во вкладке документы для каждого сотрудника у нас есть 2 режима пользования:
- Стандартный 
- React beautiful dnd version

> Как только специалист по охране труда подписал сгенерированные и скачаные документы
> он имеет возможность прикрепить их подписанные сканы в наше приложение 
- кнопкой загрузить сканы (для стандартной версии)
- перетащив любой документ из левого поля "неподписанные" в правое поле "подписанные"  

> В появившееся модальное окно прикрепляем сканы и нажимаем кнопку "загрузить"
>
>Далее они появляются и доступны в правом поле "подписанные" 

### Step Medics

![meds](https://github.com/alexfromearth/OHS_manager/raw/master/readme-assets/med.png)

>Нажав на странице сотрудника кнопку "медицинские осмотры" мы попадаем на страницу 
>прикрепления документов работника после прохождения медицинского осмотра.

### WHAT'S NEXT
В последствие будет реализована возможность создавать уникальные шаблоны для всех сотрудников, в зависимости от запросов заказчика

### CREATORS



[Автор идеи, Fullstack Developer, Широков Алексей](https://github.com/alexfromearth/)

[Fullstack Developer Ворона Александр](https://github.com/CrowAlcoholic)

[Fullstack Developer Безобразов Григорий](https://github.com/bezzskilla)
