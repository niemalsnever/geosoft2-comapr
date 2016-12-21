"use strict";

//TO-DO retrieve Data from DB
var mytree = [
  {
    text: "GDAL-Data",
    nodes: [
      {
        text: "blabla.tiff",
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
        text: "Bild.jpeg",
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
        text: "blabla.r",
      },
      {
        text: "R-Script.r"
      }
    ]
  }
];

$('#tree').treeview({
  data: mytree,         // data is not optional
  levels: 1,
  color: 'white',
  backColor: '#007399',
  borderColor: 'black',
  onhoverColor: '#004d66',
  selectedColor: '#007399',
  selectedBackColor: 'white',

});
