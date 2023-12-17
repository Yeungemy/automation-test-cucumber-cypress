class HomePage{
    get selectors(): any {
        return {
            NAVBAR: ".navbar",
            LEAD_IMAG: ".jumbotron",
            FILTERS: "#filters",
            CARD_CONTAINER: ".container",
            PAGINATION: ".pagination",
            FOOTER: "app-footer"
        };
    }

    get strings(): any {
        return {

        };
    }
}
const homePage = new HomePage();
export {homePage};