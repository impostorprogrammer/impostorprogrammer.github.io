//Abstract context with same signature (subset) as HTML canvas context object

(function () {
    // eslint-disable-next-line no-undef
    var root = typeof self == 'object' && self.self === self && self ||
        typeof global == 'object' && global.global === global && global ||
        this ||
        {};


    // Create a safe reference to the Underscore object for use below.
    var _ = function (obj) {
        if (obj instanceof _) return obj;
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
    };

    // Export the Underscore object for **Node.js**, with
    // backwards-compatibility for their old module API. If we're in
    // the browser, add `_` as a global object.
    // (`nodeType` is checked to ensure that `module`
    // and `exports` are not HTML elements.)
    if (typeof exports != 'undefined' && !exports.nodeType) {
        if (typeof module != 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root._ = _;
    }

    (function () {
        if ((typeof module != 'undefined') && module.exports !== _) {
            throw "Unexpected";
        }

        var textHeightCalc = function (text, font) {
            var fontDraw = document.createElement("canvas");

            var height = 400;
            var width = 400;

            // here we expect that font size will be less canvas geometry
            fontDraw.setAttribute("height", height);
            fontDraw.setAttribute("width", width);

            var ctx = fontDraw.getContext('2d');
            // black is default
            ctx.fillRect(0, 0, width, height);
            ctx.textBaseline = 'top';
            ctx.fillStyle = 'white';
            ctx.font = font;
            ctx.fillText(text/*'Eg'*/, 0, 0);

            var pixels = ctx.getImageData(0, 0, width, height).data;

            // row numbers where we first find letter end where it ends 
            var start = -1;
            var end = -1;

            for (var row = 0; row < height; row++) {
                for (var column = 0; column < width; column++) {

                    var index = (row * width + column) * 4;

                    // if pixel is not white (background color)
                    if (pixels[index] == 0) {
                        // we havent met white (font color) pixel
                        // on the row and the letters was detected
                        if (column == width - 1 && start != -1) {
                            end = row;
                            row = height;
                            break;
                        }
                        continue;
                    }
                    else {
                        // we find top of letter
                        if (start == -1) {
                            start = row;
                        }
                        // ..letters body
                        break;
                    }

                }

            }

            // document.body.appendChild(fontDraw);
            // fontDraw.style.pixelLeft = 400;
            // fontDraw.style.pixelTop = 400;
            // fontDraw.style.position = "absolute";


            return end - start;

        };



        _.paintContext = {
            charDimensions :
            {
                width:0,
                height:0,
            },
            measureTextEx : function () {
                var advanced = {
                    width: this._wrapped.measureText("█").width,
                    height: textHeightCalc("█", this._wrapped.font)
                };
                return advanced;
            },
            wrap: function (wrappedContext) {

                if (wrappedContext.getContext !== undefined) {
                    this._isWrapped2DCanvas = true;
                    this._wrapped = wrappedContext.getContext("2d");
                    this.charDimensions = this.measureTextEx();
                    this.width = wrappedContext.width / this.charDimensions.width;
                    this.height = wrappedContext.height / this.charDimensions.height;
                    


                }
                else {
                    this._wrapped = wrappedContext;
                    this.canvas.width = process.stdout.columns;
                    this.canvas.height = process.stdout.rows;
                }
                Object.freeze(this);
                return this;
            },
            _wrapped: undefined,
            _isWrapped2DCanvas: false,
            _fillColor: 0,
            set fillStyle(value) {
                this._fillColor = value;
                if (this._isWrapped2DCanvas)
                    this._wrapped.fillStyle = value;
                else
                    this._wrapped.ForegroundColor = value;
            },
            _previousColor: 0,
            _saveStack : 0,
            save: function () {
                if(this._saveStack == 1)
                    throw "Only supports one level of save";
                if (this._isWrapped2DCanvas) {
                    return this._wrapped.save();
                }
                else {
                    this._previousColor = this._fillColor;
                }
                this._saveStack++;
            },
            restore: function () {
                if (this._isWrapped2DCanvas) {
                    return this._wrapped.restore();
                }
                else {
                    this.fillStyle = this._previousColor;
                }
                this._saveStack--;
            },
            fillText: function (text, x, y) {
                if (this._isWrapped2DCanvas) {
                    this._wrapped.clearRect(x * this.charDimensions.width, y * this.charDimensions.height, this.charDimensions.width, this.charDimensions.height);
                    if(text != ' ')
                    {
                        this._wrapped.fillText(text, x* this.charDimensions.width, y * this.charDimensions.height);
                    }
                        
                } else {
                    this._wrapped.SetCursorPosition(x, y);
                    this._wrapped.Write(text);
                }
            }

        };
        if ((typeof module != 'undefined') && module.exports !== _) {
            throw "Unexpected";
        }
    }());
})();