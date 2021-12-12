const users = require('../../data/users')


(function($) {
    const search_term = $('#search_term').val().trim(); 
    $('#searchForm').on(function(event) {
        event.preventDefault();
        try {
            if (search_term) {
                const searched_user = users.getUserByUsername(search_term);
                $('#search_profile_h1').show();
                $('#search_profile_h1').val() = searched_user.username + "'s Profile";
                //$('#search_prof_pic').val() = searched_user.profilePicture;
                if(users.settings.showRealName == 'On') {
                    $('#search_profile_name').show();
                    $('#search_profile_name').val() = searched_user.firstName + searched_user.lastName;
                }
                $('#search_profile_email').show();
                $('#search_profile_gender').show();
                $('#search_profile_age').show();
                $('#search_profile_email').val() = searched_user.email;
                $('#search_profile_gender').val() = searched_user.gender;
                $('#search_profile_age').val() = searched_user.age;
            }
        }catch(e) {
            console.log(e);
        }
    });
})(window.jQuery);

