/* eslint-env node */
/* eslint-disable no-console, quotes, no-inner-declarations */
"use strict";
var paintCtx;
var Console = { Clear: function(){} };
if (typeof process !== "undefined") {
    Console = require("./extend_console");
    var paintCtxWrapper = require("./paintContext");
    paintCtx = paintCtxWrapper.paintContext.wrap(Console);
} 
// eslint-disable-next-line no-undef
else if(window !== undefined){
    var canvas = document.getElementById("terminal_canvas"); // eslint-disable-line no-undef
    canvas.width = Math.round(canvas.clientWidth);
    canvas.height = Math.round(canvas.clientHeight);

    paintCtx = canvas.getContext("2d");
}


var Counter = 0;
var rand = new Random();

function Random() {
    return {
        Next: function (num) {
            var res = Math.random() * num;
            return Math.round(res);
        }
    };
}

console.log = undefined; //Hide or remove console.log to avoid calling it by mistake

var Interval = 100; // Normal Flowing of Matrix Rain
var FullFlow = Interval + 30; // Fast Flowing of Matrix Rain
var Blacking = FullFlow + 50; // Displaying the Test Alone


var ConsoleColor =
    {
        DefaultColor: '0',
        DarkGreen: '32',
        Green: '92',
        ForegroundColorBlack: '90',
        BrightWhite: '97',
    };

var NormalColor = ConsoleColor.DarkGreen;
var GlowColor = ConsoleColor.Green;
var FancyColor = ConsoleColor.BrightWhite;

var TextInput = "HOLA CODESPACE!";
var TextInput2 = "Así es el mundo..";



var AsciiCharacter =
    {
        get: function () {
            var t = rand.Next(10);
            if (t <= 2)
                return String.fromCharCode("0".charCodeAt(0) + rand.Next(10));
            //return (char)('0' + rand.Next(10));
            else if (t <= 4)
                return String.fromCharCode("a".charCodeAt(0) + rand.Next(27));
            //return (char)('a' + rand.Next(27));
            else if (t <= 6)
                return String.fromCharCode("A".charCodeAt(0) + rand.Next(27));
            //return (char)('A' + rand.Next(27));
            else
                return String.fromCharCode(" ".charCodeAt(0) + rand.Next(255 - 32));
            //return (char)(rand.Next(32, 255));
        }
    };
var shouldExit = false;
function handle() {
    //Console.Write(`Received ${signal}`);
    paintCtx.Write("CTRL-C\n");
    shouldExit = true;
}

function Main() {

    if (typeof process !== "undefined") {  //Only on node
        process.on('SIGINT', handle); //Should be triggerd by CTRL+C
        process.on('SIGTERM', handle); //Should be triggerd by CTRL+BREAK
    }

    Console.CursorVisible = false;

    //painCtx.ForegroundColor = NormalColor;
    paintCtx.fillStyle = NormalColor; //"#FFFFFF";

    var dimensions = {
        get height() {
            return Math.round(paintCtx.height); // process.stdout.rows;
        },
        get width() {
            return Math.round(paintCtx.width); // process.stdout.columns;
        }
    };
    var yobj = { y: [] };
    Initialize(dimensions, yobj);//Setting the Starting Point

    run(dimensions, yobj);

}
function run(dimensions, yobj) {
    setTimeout(() => {
        Counter = Counter + 1;
        UpdateAllColumns(dimensions, yobj.y);
        if (Counter > (3 * Interval))
            Counter = 0;
        if (!shouldExit)
            run(dimensions, yobj);
        else {
            console.clear();
            Console.CursorVisible = true;
        }
    }, 70);
    // while (!shouldExit) {
    //     Counter = Counter + 1;
    //     UpdateAllColumns(dimensions, yobj.y);
    //     if (Counter > (3 * Interval))
    //         Counter = 0;
    // }
}

function UpdateAllColumns(dimensions, y) {
    var x = 0;
    var temp;
    var temp1;
    if (Counter < Interval) {
        for (x = 0; x < dimensions.width; ++x) {
            if (x % 10 == 1)//Randomly setting up the White Position
                paintCtx.fillStyle = FancyColor;
            else
                paintCtx.fillStyle = GlowColor;

            // painCtx.SetCursorPosition(x, y[x]);
            // painCtx.Write(AsciiCharacter);

            paintCtx.fillText(AsciiCharacter.get(), x, y[x]);

            if (x % 10 == 9)
                paintCtx.fillStyle = FancyColor;
            else
                paintCtx.fillStyle = NormalColor;
            temp = y[x] - 2;

            // painCtx.SetCursorPosition(x, inScreenYPosition(temp, dimensions.height));
            // painCtx.Write(AsciiCharacter);
            paintCtx.fillText(AsciiCharacter.get(), x, inScreenYPosition(temp, dimensions.height));

            temp1 = y[x] - 20;
            // painCtx.SetCursorPosition(x, inScreenYPosition(temp1, dimensions.height));
            // painCtx.Write(' ');
            paintCtx.fillText(' ', x, inScreenYPosition(temp1, dimensions.height));

            y[x] = inScreenYPosition(y[x] + 1, dimensions.height);

        }
    }
    else if (Counter > Interval && Counter < FullFlow) {
        for (x = 0; x < dimensions.width; ++x) {

            if (x % 10 == 9)
                paintCtx.fillStyle = FancyColor;
            else
                paintCtx.fillStyle = NormalColor;

            // painCtx.SetCursorPosition(x, y[x]);                
            // painCtx.Write(AsciiCharacter);//Printing the Character Always at Fixed position
            paintCtx.fillText(AsciiCharacter.get(), x, y[x]);

            y[x] = inScreenYPosition(y[x] + 1, dimensions.height);
        }
    }
    else if (Counter > FullFlow) {
        for (x = 0; x < dimensions.width; ++x) {

            // painCtx.SetCursorPosition(x, y[x]);
            // painCtx.Write(' ');//Slowly blacking out the Screen
            paintCtx.fillText(' ', x, y[x]);

            temp1 = y[x] - 20;
            // painCtx.SetCursorPosition(x, inScreenYPosition(temp1, dimensions.height));
            // painCtx.Write(' ');
            paintCtx.fillText(' ', x, inScreenYPosition(temp1, dimensions.height));

            if (Counter > FullFlow && Counter < Blacking)// Clearing the Entire screen to get the Darkness
            {
                if (x % 10 == 9)
                    paintCtx.fillStyle = FancyColor;
                else
                    paintCtx.fillStyle = NormalColor;
                temp = y[x] - 2;
                // painCtx.SetCursorPosition(x, inScreenYPosition(temp, dimensions.height));
                // painCtx.Write(AsciiCharacter);//The Text is printed Always
                paintCtx.fillText(AsciiCharacter.get(), x, inScreenYPosition(temp, dimensions.height));
            }
            // painCtx.SetCursorPosition((dimensions.width / 2) - (TextInput.length / 2), dimensions.height / 2);
            // painCtx.Write(TextInput);
            paintCtx.fillText(TextInput, (dimensions.width / 2) - (TextInput.length / 2), dimensions.height / 2);

            // painCtx.SetCursorPosition((dimensions.width / 2) - (TextInput2.length / 2), (dimensions.height / 2) + 1);
            // painCtx.Write(TextInput2);
            paintCtx.fillText(TextInput2, (dimensions.width / 2) - (TextInput2.length / 2), dimensions.height / 2 + 1);

            y[x] = inScreenYPosition(y[x] + 1, dimensions.height);
        }

    }
}
function inScreenYPosition(yPosition, height) {
    if (yPosition < 0)//When there is negative value
        return yPosition + height;
    else if (yPosition < height)//Normal 
        return yPosition;
    else// When y goes out of screen when autoincremented by 1
        return 0;

}
function Initialize(dimensions, yobj) {
    // dimensions.height = Console.WindowHeight || 80;
    // dimensions.width = Console.WindowWidth || 80;
    yobj.y = new Array(dimensions.width).fill(0);
    Console.Clear();

    for (var x = 0; x < dimensions.width; ++x)//Setting the cursor at random at program startup
    {
        yobj.y[x] = rand.Next(dimensions.height);
    }
}

if (typeof process !== "undefined")
{
    Main(); //Autorun on node
}
