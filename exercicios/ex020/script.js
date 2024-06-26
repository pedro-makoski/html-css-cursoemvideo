const inputs = Array.from(document.querySelectorAll('input[pattern^="^"]'))

function to_arr(pattern) {
    const pattern_compacted = []
    let count = 0
    let tamanho_digito_expressao = '[0-9]'.length


    for(let i = 1; i < pattern.length - 1; i++) {
        if(pattern[i] !== '\\' && (pattern[i-1] !== '{' && pattern[i+1] !== '}' && pattern[i] !== '{' && pattern[i] !== '}') && pattern[i] !== 'd') {
            pattern_compacted[count] = pattern[i]
            count ++
        } else if(pattern[i-1] === '{') {
            let number = 0
            for(let j = i; j < pattern.length; j++) {
                if(pattern[j-1] === '}') {
                    number = parseInt(pattern.slice(i, j))  
                    j = pattern.length
                }
            }

            if(pattern[i-2] === 'd') {
                for(let j = count; j < count + number; j++) {
                    pattern_compacted[j] = 'number'
                }
            }

            if (pattern.slice(i-(tamanho_digito_expressao)-1, i-1) === '[0-9]') {  
                count -= tamanho_digito_expressao
               
                for(let j = count; j < count + number; j++) {
                    pattern_compacted[j] = 'number'
                }

                if(number < tamanho_digito_expressao) {
                    for(let j = count + number; j < count + number + (tamanho_digito_expressao - number); j++) {
                        pattern_compacted.pop(j)
                    } 
                }
            }

            count += number
        }
    }

    return pattern_compacted
}

function to_string(arr, value) {
    let new_value = Array.from(value)
    let finish_for = false 

    for(let i = 0; !finish_for; i++) {
        let volta_idx = false
    
        if(new_value.length >= arr.length) {
            new_value = new_value.slice(0, arr.length)
        }  

        
        if(new_value[i] !== arr[i] && isNaN(parseInt(new_value[i]))){
            new_value.splice(i, 1)  
            volta_idx = true
        }else if(new_value[i] !== arr[i] && arr[i] !== 'number' && !isNaN(parseInt(new_value[i]))) {
            new_value.splice(i, 0, arr[i])
        }

        if(i >= new_value.length) {
            finish_for = true
        }   
        
        if(volta_idx) {
            i -= 1
        }
    }
    return new_value.join('')
}

inputs.map((input) => {
    let pattern = input.getAttribute('pattern')
    let pattern_arr = to_arr(pattern)
    
    input.addEventListener('input', () => {
        let valor = input.value
        let new_value = to_string(pattern_arr, valor)
        
        input.value = new_value
    })
})