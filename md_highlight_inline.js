const highlightjs = (md, opts) => {
    console.log(md.renderer.rules);

    md.renderer.rules.code_inline = function (tokens, idx, options, env, self) {
        var token = tokens[idx];
        var langName = options.langName || options.lastLang;

        if (langName)
            token.attrPush(['class', options.langPrefix + langName]);

        var highlighted = "";
        if (options.highlight) {
            highlighted = options.highlight(token.content, langName) || escapeHtml(token.content);
        } else {
            highlighted = escapeHtml(token.content);
        }
        return '<code' + self.renderAttrs(token) + '>'
            + highlighted
            + '</code>';

    };

    md.renderer.rules.code_block = function (tokens, idx, options, env, self) {
        return '<pre>' + md.renderer.rules.code_inline(tokens, idx, options, env, self) + '</pre>\n';
    };
    //     if (opts.code) {
    //       md.renderer.rules.code_block = wrap(md.renderer.rules.code_block)
    //     }
    //   }

    //   highlightjs.defaults = {
    //     auto: true,
    //     code: true
    //   }
};

module.exports = highlightjs;