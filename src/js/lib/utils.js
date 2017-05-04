'use strict'

module.exports = {
    /**
     * Makes smaller array chunks from a flat array, e.g.
     * `[[1,2,3],[4,5,6],[7,8,9],[0]]` from `[1,2,3,4,5,6,7,8,9,0]`.
     */
    chunk(arr, chunkSize) {
        let R = []
        for (let i = 0, len = arr.length; i < len; i += chunkSize) {
            R.push(arr.slice(i, i + chunkSize))
        }
        return R
    },
}
