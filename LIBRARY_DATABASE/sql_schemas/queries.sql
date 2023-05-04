SELECT School.name,App_user.first_name,App_user.last_name
FROM School 
JOIN App_user
ON School.school_id = App_user.school_id
JOIN Authentication 
ON Authentication.auth_id = App_user.user_id;

