# photoSearchSys
System for search of photos of participants of the field-and-track runs.                                      
The system is a request processing server with the ability to access it using the well-known API. 
It includes the following features: creating an event object, deleting it, receiving information about the event, 
downloading files with photo metadata, deleting them, and directly searching. The search is an algorithm for 
determining the likelihood of being on the verified photo of the run participant for which the search is being 
performed. This algorithm is implemented in C ++ and is connected to the server as a module.
