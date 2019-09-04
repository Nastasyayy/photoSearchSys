{
    "targets": [{
        "target_name": "testserver",
        "cflags!": [ "-fno-exceptions" ],
        "cflags_cc!": [ "-fno-exceptions" ],
        "sources": [
            "main.cpp",
	    "pod.cpp",
            "napipod.cpp",
        ],

        'include_dirs': [
            "<!@(node -p \"require('node-addon-api').include\")",
            '/usr/include/',
        ],
        'libraries': [],
        'dependencies': [
            "<!(node -p \"require('node-addon-api').gyp\")"
        ],
    }]
}
