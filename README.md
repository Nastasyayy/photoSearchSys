# Система поиска фотографий участников любительских легкоатлетических пробегов
Данный проект представляет собой микросервис с доступом по API. Сервер проекта реализован на JavaScript в программной среде Node.js с помощью фреймворка Express и ряда других модулей (реализация - myserver.js).
В рамках проекта создан алгоритм определения вероятности нахождения на фото участника пробега на основе метаданных фотографий события и файла трека участника (track.gpx). Решение представлено в виде модуля test, подключаемого в NodeJS. Используется при обработке запросов на сервер, описание возможностей API представлено в документации.

Модуль test реализован на C++. Описание алгоритма определения вероятности представлено в файле "Презентация.pptx", (реализация - папка algorithm, файлы pod.h, pod.cpp). Данный модуль был интегрирован в сервер с помощью N-API - специального средства для создания собственных расширений для Node.js (реализация - папка algorithm, файлы napipod.h, napipod.cpp, main.cpp, binding.gyp).

Каждое фото, указанного в запросе /search пробега, проходит проверку на определение вероятности нахождения на данном фото участника пробега, для которого осуществляется поиск, используя модуль test. В качестве ответа на запрос получаем массив со значениями вероятности и расположениями файлов на внешней системе, где хранятся фотографии.

