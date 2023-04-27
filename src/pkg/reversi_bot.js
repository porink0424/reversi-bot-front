let wasm;

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

const cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}
/**
* @param {Board} board
* @param {number} prop_method
* @returns {DecidePlaceResult}
*/
export function decide_place(board, prop_method) {
    _assertClass(board, Board);
    const ret = wasm.decide_place(board.ptr, prop_method);
    return DecidePlaceResult.__wrap(ret);
}

/**
* @param {Board} board
* @param {bigint} place
* @returns {PutResult}
*/
export function put(board, place) {
    _assertClass(board, Board);
    const ret = wasm.put(board.ptr, place);
    return PutResult.__wrap(ret);
}

/**
* @param {Board} board
* @returns {bigint}
*/
export function calc_legal_places(board) {
    _assertClass(board, Board);
    const ret = wasm.calc_legal_places(board.ptr);
    return BigInt.asUintN(64, ret);
}

/**
* @param {Board} board
* @returns {boolean}
*/
export function has_game_ended(board) {
    _assertClass(board, Board);
    const ret = wasm.has_game_ended(board.ptr);
    return ret !== 0;
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function getArrayU8FromWasm0(ptr, len) {
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
/**
*/
export const COLOR = Object.freeze({ BLACK:0,"0":"BLACK",WHITE:1,"1":"WHITE", });
/**
*/
export const EvalMethod = Object.freeze({ Random:0,"0":"Random",PointTable:1,"1":"PointTable",Normal:2,"2":"Normal",Win:3,"3":"Win",Perfect:4,"4":"Perfect", });
/**
*/
export const WinPrediction = Object.freeze({ WIN:0,"0":"WIN",LOSE:1,"1":"LOSE",DRAW:2,"2":"DRAW",UNKNOWN:3,"3":"UNKNOWN", });
/**
*/
export class Board {

    static __wrap(ptr) {
        const obj = Object.create(Board.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_board_free(ptr);
    }
    /**
    * @returns {bigint}
    */
    get black_stones() {
        const ret = wasm.__wbg_get_board_black_stones(this.ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
    * @param {bigint} arg0
    */
    set black_stones(arg0) {
        wasm.__wbg_set_board_black_stones(this.ptr, arg0);
    }
    /**
    * @returns {bigint}
    */
    get white_stones() {
        const ret = wasm.__wbg_get_board_white_stones(this.ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
    * @param {bigint} arg0
    */
    set white_stones(arg0) {
        wasm.__wbg_set_board_white_stones(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get put_stones_count() {
        const ret = wasm.__wbg_get_board_put_stones_count(this.ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set put_stones_count(arg0) {
        wasm.__wbg_set_board_put_stones_count(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get current_color() {
        const ret = wasm.__wbg_get_board_current_color(this.ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set current_color(arg0) {
        wasm.__wbg_set_board_current_color(this.ptr, arg0);
    }
    /**
    */
    constructor() {
        const ret = wasm.board_new();
        return Board.__wrap(ret);
    }
    /**
    * @param {bigint} black_stones
    * @param {bigint} white_stones
    * @param {number} put_stones_count
    * @param {number} current_color
    */
    set(black_stones, white_stones, put_stones_count, current_color) {
        wasm.board_set(this.ptr, black_stones, white_stones, put_stones_count, current_color);
    }
}
/**
*/
export class DecidePlaceResult {

    static __wrap(ptr) {
        const obj = Object.create(DecidePlaceResult.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_decideplaceresult_free(ptr);
    }
    /**
    * @returns {bigint}
    */
    get place() {
        const ret = wasm.__wbg_get_decideplaceresult_place(this.ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
    * @param {bigint} arg0
    */
    set place(arg0) {
        wasm.__wbg_set_decideplaceresult_place(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get win_prediction() {
        const ret = wasm.__wbg_get_decideplaceresult_win_prediction(this.ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set win_prediction(arg0) {
        wasm.__wbg_set_decideplaceresult_win_prediction(this.ptr, arg0);
    }
}
/**
*/
export class PutResult {

    static __wrap(ptr) {
        const obj = Object.create(PutResult.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_putresult_free(ptr);
    }
    /**
    * @returns {Board}
    */
    get board() {
        const ret = wasm.__wbg_get_putresult_board(this.ptr);
        return Board.__wrap(ret);
    }
    /**
    * @param {Board} arg0
    */
    set board(arg0) {
        _assertClass(arg0, Board);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_putresult_board(this.ptr, ptr0);
    }
    /**
    * @returns {bigint}
    */
    get reversed_places() {
        const ret = wasm.__wbg_get_putresult_reversed_places(this.ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
    * @param {bigint} arg0
    */
    set reversed_places(arg0) {
        wasm.__wbg_set_putresult_reversed_places(this.ptr, arg0);
    }
}

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function getImports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbg_getRandomValues_02639197c8166a96 = function(arg0, arg1, arg2) {
        getObject(arg0).getRandomValues(getArrayU8FromWasm0(arg1, arg2));
    };
    imports.wbg.__wbg_randomFillSync_dd2297de5917c74e = function(arg0, arg1, arg2) {
        getObject(arg0).randomFillSync(getArrayU8FromWasm0(arg1, arg2));
    };
    imports.wbg.__wbg_new_d87f272aec784ec0 = function(arg0, arg1) {
        const ret = new Function(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_call_eae29933372a39be = function(arg0, arg1) {
        const ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_jsval_eq = function(arg0, arg1) {
        const ret = getObject(arg0) === getObject(arg1);
        return ret;
    };
    imports.wbg.__wbg_self_e0b3266d2d9eba1a = function(arg0) {
        const ret = getObject(arg0).self;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_crypto_e95a6e54c5c2e37f = function(arg0) {
        const ret = getObject(arg0).crypto;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = getObject(arg0) === undefined;
        return ret;
    };
    imports.wbg.__wbg_getRandomValues_dc67302a7bd1aec5 = function(arg0) {
        const ret = getObject(arg0).getRandomValues;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_require_0993fe224bf8e202 = function(arg0, arg1) {
        const ret = require(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function initMemory(imports, maybe_memory) {

}

function finalizeInit(instance, module) {
    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;
    cachedUint8Memory0 = null;


    return wasm;
}

function initSync(module) {
    const imports = getImports();

    initMemory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return finalizeInit(instance, module);
}

async function init(input) {
    if (typeof input === 'undefined') {
        input = new URL('reversi_bot_bg.wasm', import.meta.url);
    }
    const imports = getImports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    initMemory(imports);

    const { instance, module } = await load(await input, imports);

    return finalizeInit(instance, module);
}

export { initSync }
export default init;
