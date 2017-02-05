"use strict";

"use strict";
//Function to set tree-view logic
var tree;

var dataTreeUpdate = function(){
    console.log('HuHu');
    $.ajax({
        type: "POST",
        url: '/api/getDataTree',
        data: {
            projectName: projectName.toString()
        },
        success: function(data) {
            console.log(data);
            tree = [data];
            return data;
        },
        complete: function() {
            $('#tree').treeview({
                data: tree
            });
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