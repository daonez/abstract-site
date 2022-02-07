class Site {
    constructor() {
        /**
         * @type {Board[]}
         */
        this.boards = [];
    }

    /**
     * @param {Board} board
     */
    addBoard(board) {
        const ownBoardNames = this.boards.map((board) => board.name);
        if (ownBoardNames.includes(board.name)) {
            throw new Error('동일한 이름의 Board는 추가할 수 없다.');
        }

        board.onCreated();
        this.boards.push(board);
    }

    /**
     * @param {string} boardName
     * @return {Board | undefined}
     */
    findBoardByName(boardName) {
        return this.boards.find((board) => board.name === boardName);
    }
}

class Board {
    /**
     *
     * @param {string} name
     */
    constructor(name) {
        if (!name) {
            throw new Error('이름을 입력해야 한다.');
        }

        this.name = name;
        this.isRegistered = false;
        /**
         * @type {Article[]}
         */
        this.articles = [];
    }

    /**
     * @param {Article} article
     */
    publish(article) {
        if (!this.isRegistered) {
            throw new Error('사용할 수 없는 게시판');
        }

        article.onPublish(this.name);
        this.articles.push(article);
    }

    getAllArticles() {
        return this.articles;
    }

    onCreated() {
        this.isRegistered = true;
    }
}

class Article {
    /**
     * @param {{
     *   subject: string;
     *   content: string;
     *   author: string;
     * }} args
     */
    constructor(args) {
        if (!args.subject || !args.content || !args.author) {
            throw new Error('필수 값 입력해주세요');
        }

        /**
         * @type {string | null}
         */
        this.id = null;
        this.subject = args.subject;
        this.content = args.content;
        this.author = args.author;

        /**
         * @type {Comment[]}
         */
        this.comments = [];
    }

    /**
     *
     * @param {string} name
     */
    onPublish(name) {
        this.id = `${name}-${Math.floor(Math.random() * 10000)}`;
        this.createdDate = new Date().toISOString();
    }

    /**
     * @param {Comment} comment
     */
    reply(comment) {
        if (!this.id) {
            throw new Error('게시되지 않은 글에는 댓글을 달 수 없다.');
        }

        comment.onPublish();
        this.comments.push(comment);
    }

    getAllComments() {
        return this.comments;
    }
}

class Comment {
    /**
     * @param {{
     *   content: string;
     *   author: string;
     * }} args
     */
    constructor(args) {
        if (!args.content || !args.author) {
            throw new Error('필수 값 입력해주세요');
        }

        this.content = args.content;
        this.author = args.author;
    }

    onPublish() {
        this.createdDate = new Date().toISOString();
    }
}

module.exports = {
    Site,
    Board,
    Article,
    Comment,
};

module.exports = {
    Site,
    Board,
    Article,
    Comment,
};
