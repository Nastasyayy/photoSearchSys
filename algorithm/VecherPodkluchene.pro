QT += core
QT -= gui

TARGET = VecherPodkluchene
CONFIG += console c++14
CONFIG -= app_bundle

TEMPLATE = app

SOURCES += main.cpp \
    napipod.cpp \
    pod.cpp


unix:!macx: LIBS += -L$$PWD/../build-BibVecher-Desktop-Debug/ -lBibVecher

INCLUDEPATH += $$PWD/../build-BibVecher-Desktop-Debug
DEPENDPATH += $$PWD/../build-BibVecher-Desktop-Debug

HEADERS += \
    napipod.h \
    pod.h
