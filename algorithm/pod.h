#ifndef POD
#define POD

#include <iostream>
#include "tinyxml2.h"
#include <vector>
#include <list>
#include <iomanip>
#include <string>
#include <cstring>
#include <functional>
#include <math.h>
#include <fstream>
#include <iterator>
#include <algorithm>
#include <map>
#include <sstream>
using namespace std;
#define TheMap map< int, pair<double,double> > //упорядоватечель и координаты пути
#define ContainerForTrack map< pair<int,time_t >, pair< double,double > > //map< pair<int,boost::posix_time::ptime >, pair< double,double > > //координаты и время в строке
#define LengthIntervalByTime pair<pair<double,double>, pair<double,double> >
#define NearestPoints pair<pair<double,double>, pair<double,double> >
#define ProectionOnTheMap pair<double,double>

#define EATH_RADIUS 6372795
#define PI 3.1415926535897932384626433832795

class BibVecher
{

public:
    BibVecher();
    double photoCheck(string filePath, string startTime, string gpsW, string gpsL, string tim);
};

#endif // POD

