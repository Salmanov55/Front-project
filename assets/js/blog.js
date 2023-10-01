document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".menu-item");

    menuItems.forEach(function (menuItem) {
        const menuLink = menuItem.querySelector(".menu-link");
        const submenu = menuItem.querySelector(".submenu");
        const megamenu = menuItem.querySelector(".mega-menu");
        const arrow = menuItem.querySelector(".arrow");

        menuLink.addEventListener("click", function (e) {
            e.preventDefault();

            menuItems.forEach(function (item) {
                const otherSubmenu = item.querySelector(".submenu");
                const otherMegamenu = item.querySelector(".mega-menu");
                const otherArrow = item.querySelector(".arrow");

                if (item !== menuItem) {
                    if (otherSubmenu) {
                        otherSubmenu.style.display = "none";
                    }
                    if (otherMegamenu) {
                        otherMegamenu.style.display = "none";
                    }
                    if (otherArrow) {
                        otherArrow.style.transform = "rotate(0deg)";
                    }
                }
            });

            if (submenu && submenu.style.display === "block") {
                submenu.style.display = "none";
            } else if (submenu) {
                submenu.style.display = "block";
            }

            if (megamenu && megamenu.style.display === "block") {
                megamenu.style.display = "none";
            } else if (megamenu) {
                megamenu.style.display = "block";
            }

            if (arrow) {
                arrow.style.transform =
                    arrow.style.transform === "rotate(180deg)"
                        ? "rotate(0deg)"
                        : "rotate(180deg)";
            }
        });

        document.addEventListener("click", function (event) {
            if (!menuItem.contains(event.target)) {
                if (submenu) {
                    submenu.style.display = "none";
                }
                if (megamenu) {
                    megamenu.style.display = "none";
                }
                if (arrow) {
                    arrow.style.transform = "rotate(0deg)";
                }
            }
        });
    });
});