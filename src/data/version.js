import useLocalStorage from "./data/useLocalStorage"

function version() {
    const [version, setVersion] = useLocalStorage("version", 0) // Update version when noteExamples are changed
}

version()
