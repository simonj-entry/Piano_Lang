class piano{
    constructor(code){
        this.code = code.replaceAll('\n', ' ');
        this.collect = '';

        this.res1 = this.analyze(this.code);
        return this.res1;
    }

    types(code){
        switch(code){
            case('도'):
                return 'OUTPUT';
                break;
            default:
                return 'NUM_STR';
                break;
        }
    }

    output(data){
        let databox = data;
        let tokens;
        for(let j = 0; j < databox.length; j++){
            let jsons = JSON.parse(String(databox[j])); 
            if(jsons.type == 'OUTPUT'){
                this.finish(tokens, this.collect);
                tokens = jsons.type;
            }
            else if(jsons.type == 'NUM_STR'){
                this.collect += jsons.name;
            }
        }
        this.finish(tokens, this.collect);
    }

    finish(token, str_num){
        if(str_num){
            if(token == 'OUTPUT'){
                console.log(str_num);
            }
            else{
                console.error('token error');
            }
            this.collect = '';
        }
    }

    analyze(codes){
        let code_arr = Array.from(codes);
        let codes_dict = {};
        for(let i = 0; i < codes.length; i++){
            codes_dict[String(i)] = code_arr[i];
        }
        let data = [];
        for(let code in codes_dict){
            const name_type = `{"name":"${String(codes_dict[code])}", "type":"${this.types(codes_dict[code])}"}`;
            data.push(name_type);
        }
        this.output(data);
    }
}