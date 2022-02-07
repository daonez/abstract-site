class Site {
    constructor() {
        // boards 를 만든다
        this.boards = [];
    }
    // 게시글 만들기

    addBoard(board) {
        // 같은 이름 확인
        const ownBoardNames = this.boards.map((board) => board.name);
        // 게시글 이름이 존재하면 에러 처리
        if (ownBoardNames.includes(board.name)) {
            throw new Error('동일한 이름의 Board는 추가할 수 없다.');
        }
        // 보드 만들고, boards 배열에 push
        board.onCreated();
        this.boards.push(board);
    }

    // board 이름 return  혹은 find가 못찾으면 undefined 리턴된다.
    findBoardByName(boardName) {
        return this.boards.find((board) => board.name === boardName);
    }
}

class Board {
    // name데이터가 있어야 하며, null, "" 이면 안된다
    constructor(name) {
        if (!name) {
            throw new Error('이름을 입력해야 한다.');
        }
        // name = name
        this.name = name;
        // 등록되있다 기존 =false
        this.isRegistered = false;

        // article 넣을 배열
        this.articles = [];
    }

    // Board.publish 메서드 사용할때, if (already registered )면 사용할수없다
    publish(article) {
        if (!this.isRegistered) {
            throw new Error('사용할 수 없는 게시판');
        }
        // 사용할 수 있는 게시물(article) 이면 articles한테 push하여 배열에 저장
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
    // subject,content,author 가 null또는 빈문자면 안되니까 !args 사용
    constructor(args) {
        if (!args.subject || !args.content || !args.author) {
            throw new Error('필수 값 입력해주세요');
        }

        // 문자열들 or null
        this.id = null;
        this.subject = args.subject;
        this.content = args.content;
        this.author = args.author;

        // comments 배열
        this.comments = [];
    }

    // 작성일자 추가 , board에 article 추가하때 랜덤값 지정
    onPublish(name) {
        this.id = `${name}-${Math.floor(Math.random() * 10000)}`;
        this.createdDate = new Date().toISOString();
    }

    reply(comment) {
        if (!this.id) {
            throw new Error('게시되지 않은 글에는 댓글을 달 수 없다.');
        }

        comment.onPublish();
        this.comments.push(comment);
    }

    // 작성된 댓글 목록조회
    getAllComments() {
        return this.comments;
    }
}

class Comment {
    // author,content 필요
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
