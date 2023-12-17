class Header{
    get selectors(): any {
        return {
            NAV_LINKS: ".nav-link"
        };
    }

    get strings(): any {
        return {
            PAGE_TITLE: "Practice Software Testing - Toolshop"
        };
    }
}
const header = new Header();
export {header};