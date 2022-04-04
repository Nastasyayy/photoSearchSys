# photoSearchSys
Данный проект представляет собой микросервис с доступом по API. Сервер проекта реализован на JavaScript в программной среде Node.js с помощью фреймворка Express и ряда других модулей (файл myserver.js, myserver.png - реализованные запросы). 

Каждое фото, указанного в запросе /search пробега, проходит проверку на определение вероятности нахождения на данном фото участника пробега, для которого осуществляется поиск, используя модуль test. В качестве ответа на запрос получаем массив со значениями вероятности и расположениями файлов на внешней системе, где хранятся фотографии.

Модуль test реализован на C++. Описание алгоритма определения вероятности представлено в файле "Презентация.pptx" (папка algorithm - pod.h, pod.cpp). Данный модуль был интегрирован в сервер с помощью N-API - специального средства для создания собственных расширений для Node.js (папка algorithm - файлы napipod.h, napipod.cpp, main.cpp, binding.gyp).

Для проверки работоспособности API был использован Swagger Inspector.

track.gpx - пример файла трека, необходимого для запроса /search.

