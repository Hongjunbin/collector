// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, getFirestore, setDoc, where, query } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCVd8C2rs2Wbh2j3dGnPEYl8_Ap99WZfAA",
    authDomain: "rehamus-4349e.firebaseapp.com",
    projectId: "rehamus-4349e",
    storageBucket: "rehamus-4349e.appspot.com",
    messagingSenderId: "199277879635",
    appId: "1:199277879635:web:901dc64f8d3e8f28a901a6",
    measurementId: "G-M1VXRZKM0V"
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



let docs = await getDocs(collection(db, "coll"));

/*회원가입 시작*/
$('#login_new').click(async function () {
    let id = $('#login_id').val();
    let pw = $('#login_pw').val();
    let count = 0;

    docs.forEach((doc) => {
        let idd = doc.data();
        let t_id = idd['login_id'];
        if (t_id == id) {
            count++;
        }
    })
    if (count != 0) {
        return alert("이미 존재하는 아이디 입니다.");
    }
    let doc = {
        'login_id': id,
        'login_pw': pw
    };

    await addDoc(collection(db, "coll"), doc);

    alert("회원가입 완료");

    window.location.reload()

});
/*회원가입 끝*/



/*로그인 시작*/
$('#login').click(function () {// 로그인 선택시
    let t_id = $('#login_id_t').val();
    let t_pw = $('#login_pw_t').val();
    if (t_id == "" || t_pw == "") {
        alert("제대로 입력해 주세요");
    } else {
        let count = 0;
        let count2 = 0;
        docs.forEach((doc) => {
            count++;
            let idd = doc.data();
            let id = idd['login_id'];
            let pw = idd['login_pw'];
            if (t_id == id && t_pw == pw) {
                console.log("로그인 완료")
                $('.id_Design').addClass('login');// 로그인 화면 치우기
                $('.id_menu').addClass('login');
                $('.ID_log *').removeClass('show');
                sessionStorage.setItem("login_o", t_id);
                setTimeout(function() {// 로그인후 1.5초후 세로고침
                    window.location.reload()
                  }, 1500);
            } else {
                count2++;
            }
        })
        if (count == count2) {
            alert("정보가 틀립니다.");
            setTimeout(function() {//  1.5초후 세로고침
            window.location.reload()
           }, 1500);
        }
    }
});
/*로그인 끝*/



/*비밀번호 찼기 시작*/
$('#login_f_pw').click(function () {// 비밀번호 찼기 선택시
    let t_id = $('#login_id').val();
    docs.forEach((doc) => {
        let idd = doc.data();
        let id = idd['login_id'];
        let pw = idd['login_pw'];

        if (t_id == id) {
            alert("비밀번호" + pw);
        }

    })
});
/*비밀번호 찼기 끝*/




// 새 취미 저장버튼 클릭 시
$("#saveHobby").click(async function () {
    // 입력된 취미명을 가져옵니다.
    let inputHobby = $('#inputHobby').val();
    let session = sessionStorage.getItem("login_o");

    // await addDoc(collection(db, "hobbies"), { hobbyName: inputHobby });
    const docRef = doc(db, "hobbies", inputHobby); // "hobbies" 컬렉션에 대한 참조 생성
    await setDoc(docRef, { hobbyName: inputHobby, session: session }); // 새로운 문서 추가
    alert('저장 완료!');
    window.location.reload();
});



// 링크 저장 버튼 클릭 시
$("#saveLink").click(async function () {
    // 선택된 취미명을 가져옵니다.
    let selectHobby = $('#selectHobby').val();
    let contentType = $('#contentType').val();
    let address = $('#address').val();
    // console.log(selectHobby);
    // console.log(contentType);
    // console.log(address);
    try {
        // 선택한 취미가 이미 존재하는 경우 해당 문서를 업데이트합니다.
        const docRef = doc(db, "hobbies", selectHobby); // 문서를 직접 참조
        // await setDoc(docRef, { contentType: contentType, address: address }, { merge: true });
        // await setDoc(docRef, {
        //     contents: firestore.FieldValue.arrayUnion({
        //         contentType: contentType,
        //         address: address
        //     })
        // }, { merge: true });
        await setDoc(docRef, {
            contents: arrayUnion({
                contentType: contentType,
                address: address
            })
        }, { merge: true });
        alert('저장 완료!');
        window.location.reload();
    } catch (error) {
        console.error("Error updating document: ", error);
        alert('저장에 실패했습니다.');
    }
});




let docs2 = await getDocs(collection(db, "hobbies"));
let count = 0;
docs2.forEach((doc) => {
    let row = doc.data();
    let hobbyName = row['hobbyName'];
    let session = row['session'];
    let addresses = row['contents'];
    // console.log(row['hobbyName']);
    // console.log(addresses);
    // console.log(hobbyName);
    // console.log(session);
    // let addresses = row['contents'];
    // let inputHobby = row['hobbyName'];
    // let session = row['session'];

    if (session == sessionStorage.getItem("login_o")) {// 세션(로그인된 ID 와 동일 취미명이 나오게함)

        //취미명 버튼 추가
        let temp_html1 = `
            <button id="${hobbyName}" type="button" class="btn btn-secondary">${hobbyName}</button>`;
        $('#category').append(temp_html1);

        // 유트브 추가
        // let Youtub = `
        // <iframe width="560" height="315" src="${addresses[0]['address']}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>;`
        // $('#Youtube>div').append(Youtub);

        //링크 저장 버튼 내에 취미 선택지 추가
        let link_temp_html = `
            <option value="${hobbyName}">${hobbyName}</option>`;
        $('#selectHobby').append(link_temp_html);
    }

    count++;
});



//!!!준빈님이 완성하실 부분!!! 취미버튼 클릭 시 - 클릭 이벤트 핸들러 정의 (버튼이 생성된 이후에 정의되어야 함)
$(document).on("click", ".btn-secondary", async function () {
    // 클릭된 버튼에 대한 동작 구현

    // 예를 들어, 클릭된 취미에 대한 추가 정보를 가져오는 등의 작업을 수행할 수 있습니다.
    let hobbyName = $(this).attr("id");

    let docs2 = await getDocs(collection(db, "hobbies"));

    // console.log("Clicked hobby: ", hobbyName);

    $('#hobbyTitle').empty(); // 기존 제목 초기화
    $('#hobbyTitle').append(hobbyName); // 제목 삽입

    //기록타입과 링크주소 각각의 배열 (n번째 요소끼리 세트)
    let contentTypes = [];
    let addresses = [];

    const docRef = doc(db, "hobbies", hobbyName);
    const docSnap = await getDoc(docRef);

    const data = docSnap.data();

    data.contents.forEach((content) => {
        contentTypes.push(content.contentType);
        addresses.push(content.address);
    });

    // 배열에 저장된 contentType과 address를 출력하거나 사용할 수 있습니다.
    console.log("Content Types:", contentTypes);
    console.log("Addresses:", addresses);

    // 여기에 추가 작업을 수행하세요.
    // 배열의 문자열을 통해 index 번호 뽑기
    const youtubeIndex = contentTypes.indexOf('youtube');
    const namuwikiIndex = contentTypes.indexOf('namu');
    const photoIndex = contentTypes.indexOf('photo');
    // 데이터 충돌 방지
    $('#youtubeView').empty();
    $('#namuwikiView').empty();
    $('#photoView').empty();

    let youtube_temp_html = '';
    let namuwiki_temp_html = '';
    let photo_temp_html = '';
    if(youtubeIndex == -1){
        youtube_temp_html = `<div>##유트브 링크 없음.##</div>`;
    } else {
        youtube_temp_html = `<a href="${addresses[youtubeIndex]}">${addresses[youtubeIndex]}</a>`;
    }
    if(namuwikiIndex == -1){
        namuwiki_temp_html = `<div>##나무위키 링크 없음.##</div>`;
    } else {
        namuwiki_temp_html = `<a href="${addresses[namuwikiIndex]}">${addresses[namuwikiIndex]}</a>`;
    }
    if(photoIndex == -1){
        photo_temp_html = `<div>##사진 없음.##</div>`;
    } else {
        photo_temp_html = `<img src="${addresses[photoIndex]}"></img>`;
    }
    $('#youtubeView').append(youtube_temp_html);
    $('#namuwikiView').append(namuwiki_temp_html);
    $('#photoView').append(photo_temp_html);
});

$('#youtubeOpencloseBtn').click(function(){
    $('#youtubeView').toggle();
})
$('#namuOpencloseBtn').click(function(){
    $('#namuwikiView').toggle();
})
$('#photoOpencloseBtn').click(function(){
    $('#photoView').toggle();
})










