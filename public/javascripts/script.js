$('#register').click(function(){
    $.ajax({
        url: '/',
        type: 'POST',
        cache: false,
        data: {
            fullname : $('#fullname').val(),
            email: $('#email').val(),
            nohp: $('#nohp').val(),
            tgllahir: $('#tgllahir').val(),
            jenis_kelamin: $('#jenis_kelamin').val(),
            password: $('#password').val(),
            cpassword: $('#cpassword').val()

        },
        success: function(){
            $('#error-group').css('display', 'none');
            alert('Your submission was successful');
        },
        error: function (data) {
            $('#error-group').css('display', 'block');
            var errors = JSON.parse(data.responseText);
            var errorsContainer = $('#errors');
            errorsContainer.innerHTML = '';
            var errorsList = '';
      
            for (var i = 0; i < errors.length; i++) {
              errorsList += '<li>' + errors[i].msg + '</li>';
            }
            errorsContainer.html(errorsList);
          }
    })
})