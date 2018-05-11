import test1 from './test.js';
import '../css/main.css';

var music = require("../music.mp3");
$('audio').attr("src",music);
console.log('test');
test1();

var loadImgsArr = [
    require('../image/1.jpg'),
    require('../image/1.png'),
    require('../image/2.png')
];

netease.loading(loadImgsArr, function () { 
    console.log("load");
});




