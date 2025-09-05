export enum RouterRoutesNames {
    Home = "",
    Trade = "trade",
}

export enum RouterRoutes {
    Home = "/",
    Trade = "/" + RouterRoutesNames.Trade,
    NotFound = "*",
}