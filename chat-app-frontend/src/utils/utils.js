export const wrapUserNames = (text) => {
    let finalText = [];
    let userNameStartIndex = text.indexOf('@');

    const separators = [' ', ',', '.', '-', '!', '?', '/', '\\'];

    while(userNameStartIndex !== -1) {
        let userNameEndIndexArr = [];
        separators.forEach(separator => {
            let index = text.indexOf(separator, userNameStartIndex);
            if (index !== -1) userNameEndIndexArr.push(index);
        });

        let userNameEndIndex = userNameEndIndexArr.length ? Math.min(...userNameEndIndexArr) : -1;

        finalText.push([
            text.slice(0, userNameStartIndex),
            <b className="user-tag">{text.slice(userNameStartIndex, (userNameEndIndex === -1 ? text.length : userNameEndIndex))}</b>,
            ( userNameEndIndex === -1 ? '' : text.slice(userNameEndIndex) )
        ]);
                
        if(userNameEndIndex !== -1) userNameStartIndex = text.indexOf('@', userNameEndIndex);
        else userNameStartIndex = -1;
    }

    return ( finalText.length ? finalText : text );
}