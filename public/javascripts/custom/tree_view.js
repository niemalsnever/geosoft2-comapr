"use strict";

"use strict";
//Function to set tree-view logic
var tree;

var dataTreeUpdate = function(){
    $.ajax({
        type: "POST",
        url: '/api/getDataTree',
        data: {
            projectName: projectName.toString()
        },
        success: function(data) {
            tree = data;
        },
        complete: function() {
            if (tree != null) {
                $('#tree').treeview({
                    data: [tree]
                });
            } else {
                $('#tree').append('<div style="font-size: small; text-align: center; font-style: italic">Your project does not contain any files</div>')
            }
        }
    })
};

//TO-DO retrieve Data from DB
var demoTree = [
    {
        text: "GDAL-Data",
        nodes: [
            {
                text: "blabla.tiff"
            },
            {
                text: "blubblub.tiff"
            }
        ]
    },
    {
        text: "Images",
        nodes: [
            {
                text: "Bild.jpeg"
            },
            {
                text: "blub.jpg"
            }
        ]
    },
    {
        text: "Scripts",
        nodes: [
            {
                text: "blabla.r"
            },
            {
                text: "R-Script.r"
            }
        ]
    }
];