function checkForCommentBlock(context) {
    return {
        Program: (node) => {
            if (!node || typeof node !== 'object') { return; }
            if (!node.comments || !Array.isArray(node.comments)) { return; }

            node.comments
                .filter((comment) => comment && typeof comment === 'object')
                .filter((comment) => comment.type === 'Block')
                .forEach((comment) => {
                    context.report({
                        node,
                        message: "Invalid comment type. Remove, or replace '/*' with '//'",
                        loc: comment.loc,
                    });
                });
        },
    };
}

module.exports = {
    meta: {
        fixable: 'code',
        docs: {
            description: 'Disable use of block comment lines',
            category: 'suggestion',
            url: 'https://www.github.com/Ryandev/eslint-no-comment',
            recommended: false,
        },
        schema: [],
    },
    create: checkForCommentBlock,
};