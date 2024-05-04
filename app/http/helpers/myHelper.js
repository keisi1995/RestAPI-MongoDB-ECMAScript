export const validationErrors = (errors) => {
    const firstError = {}
    errors.forEach(error => {
        if (!firstError[error.path]) {
            firstError[error.path] = [error.msg]
        }
    })

    return firstError
}