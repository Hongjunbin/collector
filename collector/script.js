
/*로그인상태 유지 시작 */
function login_test() {

  if (sessionStorage.getItem("login_o") == null) {
    sessionStorage.setItem("login_o", 0);
  }else if (sessionStorage.getItem("login_o") != 0) {
    $('.ID_log').hide();
  }
  }
  login_test();
/*로그인상태 끝 */

$('.log_find > *').click(function() {
    $('.id_new').addClass('show');
  });
  /*회원가입 설정*/
  $('.id_new_C').click(function() {
    $('.id_new').removeClass('show');
    $('#F_new_Id_menu').removeClass('show');
    $('#F_fw_menu').removeClass('show');
  });
  $('#F_new_Id').click(function() {
    $('#login_new').removeClass('hidden')
    $('#login_f_pw').addClass('hidden')
  });

  $('#F_fw').click(function() {
    $('#login_f_pw').removeClass('hidden')
    $('#login_new').addClass('hidden')
  });
  /*가입 설정 추가*/


/*로그아웃 구현 */
  $('#logout').click(function() {
    sessionStorage.setItem("login_o",0);
    $('.id_Design').removeClass('login');
    $('.id_menu').removeClass('login');
          window.location.reload()
  });
/*로그아웃 끝 */
  
