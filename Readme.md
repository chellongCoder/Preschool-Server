## how to use

1. clone project 
2. cd project
3. npm install
4. nodemon

# setup project 
1. `npm install`
2. `cd public `
3. `bower install`
4. `cd ..`
5. `npx sequelize-cli db:migrate `
6. `npm start`
7. **open new terminal tab** > `node seed.js` (tạo account cho user)
8. `npx sequelize-cli db:seed:all` (tạo tài khoản admin)
9. `sequelize seed:generate --name ${ten_seeder}` (tạo tài khoản)
# Mô tả chức năng
1. Đăng nhập hệ thống
    Cho phép người dùng đăng nhập vào Trang quản lý hồ sơ sức khỏe học sinh. <br>
    **Role:** 
    - QTHT (`code: 10`)
    - TH (`code: 11`)
    - GV (`code: 12`) <br>

    **Luồng:** 
    - Chọn chức năng đăng nhập hệ thống.
    - người dùng điền thông tin đăng nhập, submit để đăng nhập vào hệ thống
    - Đăng nhập thành công vào hệ thống
         
## chạy lại migration
1.  `npx sequelize-cli migration:create  --name modifier-${tên_bảng_cần_sửa}`
2.  vào file mới tạo trong migrations -> sửa 
3.  
http://localhost:8080/reset?email=nhatlong@hocvienact.edu.vn
