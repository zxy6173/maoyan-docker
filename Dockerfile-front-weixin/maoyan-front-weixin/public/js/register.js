window.onload = function(){
    $(":text[name=phone]").blur(function(){
        $(this).parent().find(".inline-tip").remove();
        if(/^1[3578]\d{9}$/.test($(this).val())){
            $.ajax({
                type:"get",
                url:"/users/findByPhone",
                data:{phone:$(this).val()},
                success:(data) => {
                    console.log("data",data);
                    if(data.status == 0){
                        $(this).after("<span class='inline-tip'><i class='tip-status tip-status--opinfo'></i>手机已被注册</span>");
                    }else{
                        $(this).after("<span class='inline-tip'><i class='tip-status tip-status--success'></i></span>");

                    }
                }
            });

        }else{
            $(this).after("<span class='inline-tip'><i class='tip-status tip-status--opinfo'></i>格式不正确</span>");
        }
    });
    $(":text[name=verifycode]").blur(function(){
        $(this).parent().find(".inline-tip").remove();
        if(/^\d{6}$/.test($(this).val())){
            $(this).after("<span class='inline-tip'><i class='tip-status tip-status--success'></i></span>");
        }else{
            $(this).after("<span class='inline-tip'><i class='tip-status tip-status--opinfo'></i>格式不正确</span>");
        }
    });
    $(":password[name=pwd]").blur(function(){
        $(this).parent().find(".inline-tip").remove();
        if(/^.{6,}$/.test($(this).val())){
            $(this).after("<span class='inline-tip'><i class='tip-status tip-status--success'></i></span>");
        }else{
            $(this).after("<span class='inline-tip'><i class='tip-status tip-status--opinfo'></i>格式不正确</span>");
        }
    });
    $(":password[name=password2]").blur(function(){
        $(this).parent().find(".inline-tip").remove();
        if($(this).val() == $(":password[name=pwd]").val()){
            $(this).after("<span class='inline-tip'><i class='tip-status tip-status--success'></i></span>");
        }else{
            $(this).after("<span class='inline-tip'><i class='tip-status tip-status--opinfo'></i>密码不一致</span>");
        }
    });
}
