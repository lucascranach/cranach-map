import { atom } from "jotai"

export const mapDataAtom = atom()

export const clusterAtom = atom()

const pathname = window.location.pathname.split("/")[1]
const language = pathname === "en" || pathname === "de" ? pathname : "de"

export const languageAtom = atom(language)

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
export const darkModeAtom = atom(prefersDark)
