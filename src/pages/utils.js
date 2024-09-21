export const getTextStyles = (text) => {
    const tree = {};
    const words = text.split(' ');

    function build(index, prev) {
        const specCharacter = isSpecial(words[index]);
        if(specCharacter) {
            let parent = prev;
            if(!prev) parent = new Node();
            else 
            if(words[index].starts('/ul:')) {
                parent.children = [];
                parent.open = '<ul>';
                parent.close = '</ul>';
            }
        } else {
            let parent = prev;
            if(!prev) parent = new Node();
            parent.children = [];
        }
    }

};
export const format = (text) => {
    const words = text.split(' ');
    let res = '';
    for (let word of words) {
        

        if(word.endsWith('\n')) res += `</br>`;
    }
    return res;
};