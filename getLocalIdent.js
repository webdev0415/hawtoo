import incstr from 'incstr'

// region CSS Scope Minify
const createUniqueIdGenerator = () => {
    const index = {}

    const generateNextId = incstr.idGenerator({
        // Removed "d" letter to avoid accidental "ad" construct.
        // @see https://medium.com/@mbrevda/just-make-sure-ad-isnt-being-used-as-a-class-name-prefix-or-you-might-suffer-the-wrath-of-the-558d65502793
        // NOTE: allow "d" letter due to combination of UPPERCASES-lowercases
        alphabet: 'abcdefghijklmnopqrstuvwxyz0123456789_-'
    });

    return (name) => {
        if (index[name]) {
            return index[name]
        }

        let nextId

        do {
            // Class name cannot start with a number.
            nextId = generateNextId()
        } while (/^[0-9_-]/.test(nextId))

        index[name] = generateNextId()
        // console.log(`${name} has id = ${index[name]}`);

        return index[name]
    }
}

const idLocal = createUniqueIdGenerator()
const idComponent = createUniqueIdGenerator()
const generateScopedName = (localName, resourcePath) => {
    const componentName = resourcePath.split('/').slice(-2).join('/')
    return idComponent(componentName) + idLocal(localName)
}

const getLocalIdent = (context, _localIdentName, localName) =>
    generateScopedName(localName, context.resourcePath)

export default getLocalIdent