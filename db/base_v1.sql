PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE users_master (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    mobile_number TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    is_active BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO users_master VALUES(1,'9999999999','$2a$10$XzOXBbEE7jrPLaCHf5134Od3O/IY5JTA3Sxyq9JXsTCgedwMHS6Em','admin@employdex.com','Admin','User',1,'2025-06-27 07:55:34','2025-06-27 07:55:34');
INSERT INTO users_master VALUES(9,'9876543212','$2a$10$Tbi/pGSS5GnapicdqA.gY.ImtWnePWiK8z0bTYiEnkVO6RLUyYTAq','robert.johnson@employdex.com','Robert','Johnson',1,'2025-06-27 09:30:10','2025-06-27 09:30:10');
INSERT INTO users_master VALUES(23,'9001001004','$2b$10$d5BIgbhrFXmoHaPxojglzeXHVZlCBXTQhiJc9F.EP2Mlp9yE6Kzc6','jennifer.wilson@employdex.com','Jennifer','Wilson',1,'2025-07-25 05:46:12','2025-07-25 05:46:12');
INSERT INTO users_master VALUES(40,'rajiv.thakkar@skj.ican.in','$2b$10$4Q3VWQufTOiuBnI6tDpV7eZOyXPzy9e0LLZUEhp965AnfPzPKr4Pi','rajiv.thakkar@skj.ican.in','Rajiv','Thakkar',1,'2025-07-25 07:03:53','2025-07-25 07:03:53');
INSERT INTO users_master VALUES(41,'8830288098','$2b$10$XSQ7YuU0GAIU/5iEUhwpb./L1EfJZU44HrpuzF0bJiTSzyMZnHlS.','alisha.bora@skj.ican.in','Alisha','Bora',1,'2025-07-25 07:03:54','2025-07-25 08:06:21');
INSERT INTO users_master VALUES(42,'6261408004','$2b$10$GwlKXN/ucyW5fcXiNKSx6.hoh2TMuU7/aNefLlyX0bOQBz0te68fK','parth.soni@skj.ican.in','Parth','Soni',1,'2025-07-25 07:03:54','2025-07-25 08:06:21');
INSERT INTO users_master VALUES(43,'9284250757','$2b$10$rL295HCG8W9yI541sW9kue1Brd8TZwBEtaG91qTsswdTjZC1t.ntW','khushi.desai@skj.ican.in','Khushi','Desai',1,'2025-07-25 07:03:54','2025-07-25 08:06:21');
INSERT INTO users_master VALUES(44,'9307332893','$2b$10$F9BzEJOziMwucsLCrUcuieafxkSK5EuEajAjMSm2uGn0lA/azNtOW','javed.shaikh@skj.ican.in','Javed','Shaikh',1,'2025-07-25 07:03:54','2025-07-25 08:06:21');
INSERT INTO users_master VALUES(45,'7887867352','$2b$10$dvWo3kbHoAhJQepI4hoJVuE7Xg7IQE3Yg3G/zee3jcsm9vPjZ85m.','harshal.agrawal@skj.ican.in','Harshal','Agarwal',1,'2025-07-25 07:03:54','2025-07-25 08:06:21');
INSERT INTO users_master VALUES(46,'8624017283','$2b$10$wN6jvGEYS6ZmBWCIMs0aT.mpxMyW6ewxxDnsOAvhZNHqCW2IvlpXe','ankita.bhapkar@skj.ican.in','Ankita','Bhapkar',1,'2025-07-25 07:03:54','2025-07-25 08:06:21');
INSERT INTO users_master VALUES(47,'9665026913','$2b$10$F3pM2XScHcO6PS5NajGGiuZO2uboPBd7MadyaSGVXDGAA0DfYNT5W','ajay.soni@skj.ican.in','Ajay','Soni',1,'2025-07-25 07:03:54','2025-07-25 08:06:21');
INSERT INTO users_master VALUES(48,'9022071402','$2b$10$aVzLkZ.K0CEkgvqcUQg.Zedz2sXV.sF/acZ7Ri09KVYQJcBOD4Cu6','shirish.jadhav@skj.ican.in','Shirish','Jadhav',1,'2025-07-25 07:03:54','2025-07-25 08:06:21');
INSERT INTO users_master VALUES(49,'8275356561','$2b$10$IutZJ75gyBzDZJJRTEhBWuFUKKZ23LueWz.rbiN2i54DuvSqSeRZO','tanisha.bora@skj.ican.in','Tanisha','Bora',1,'2025-07-25 07:03:54','2025-07-25 08:06:21');
INSERT INTO users_master VALUES(50,'8956669005','$2b$10$yyUDElGjUO2vb8tI/DBM/.hpgKJ5CXXxnIu/TxbTUvVe/c3Fp0Kvy','naman.kesharwani@skj.ican.in','Naman','Kesharwani',1,'2025-07-25 07:03:54','2025-07-25 08:06:21');
INSERT INTO users_master VALUES(51,'shubham.sawant@skj.ican.in','$2b$10$oVVUQFRDXWdJZI1w6ARQTOthQ4SnPhHtf76dfDxm1tzmV1EkNi8c6','shubham.sawant@skj.ican.in','Shubham','Sawant',1,'2025-07-25 07:03:54','2025-07-25 07:03:54');
INSERT INTO users_master VALUES(52,'atharv.rajmane@skj.ican.in','$2b$10$IIapg59VOyrDJn2BpT6v5O8PFrm5u.h39pv6Li52VWZgRPftroLoK','atharv.rajmane@skj.ican.in','Atharv','Rajmane',1,'2025-07-25 07:03:54','2025-07-25 07:03:54');
INSERT INTO users_master VALUES(53,'netra.bafna@skj.ican.in','$2b$10$CCIh3t4LppKjUNhPtVWToODizCxMOO8wcGpfTVRD70zqOqXPTeP6W','netra.bafna@skj.ican.in','Netra','Bafna',1,'2025-07-25 07:03:54','2025-07-25 07:03:54');
INSERT INTO users_master VALUES(54,'aboli.jadhav@skj.ican.in','$2b$10$IuhUT7huUJx0/BtZCVuEZu4BsKfLAR2qRieYqpVcv/CVsB2oXo2Uu','aboli.jadhav@skj.ican.in','Aboli','Jadhav',1,'2025-07-25 07:03:54','2025-07-25 07:03:54');
INSERT INTO users_master VALUES(55,'rusheel.borse@skj.ican.in','$2b$10$IWq95n9JTSaWipemmoink.pym0aJpHbv6A6spkmCHHx0ukMsrPpyi','rusheel.borse@skj.ican.in','Rusheel','Borse',1,'2025-07-25 07:03:54','2025-07-25 07:03:54');
INSERT INTO users_master VALUES(56,'khushi.bhutada@skj.ican.in','$2b$10$Sa0CTPOTYVvS8RGt8RPD4OJRuCEwiCx9EGXjM73neLScjUF/J0GmK','khushi.bhutada@skj.ican.in','Khushi','Bhutada',1,'2025-07-25 07:03:54','2025-07-25 07:03:54');
INSERT INTO users_master VALUES(57,'sakshi.kathed@skj.ican.in','$2b$10$iPfIfxiTqt4vr0SjKRpokOb3enR8kSEYly6gH9IpqdAEYVpOaBUtG','sakshi.kathed@skj.ican.in','Sakshi','Kathed',1,'2025-07-25 07:03:54','2025-07-25 07:03:54');
INSERT INTO users_master VALUES(58,'lajari.oswal@skj.ican.in','$2b$10$iweEPE.oEIzac0mPsaAYBudgr5oigFHWap6s.aA3gKz0TWv7gD27.','lajari.oswal@skj.ican.in','Lajari','Oswal',1,'2025-07-25 07:03:54','2025-07-25 07:03:54');
INSERT INTO users_master VALUES(59,'neelesh.khandelwal@skj.ican.in','$2b$10$9vSqSAFYR5krs8zseqG9Z.sb8k4KijLudGN0/9QPWNSQRgOviORnK','neelesh.khandelwal@skj.ican.in','Neelesh','Khandelwal',1,'2025-07-25 07:03:54','2025-07-25 07:03:54');
INSERT INTO users_master VALUES(60,'sahil.khurana@skj.ican.in','$2b$10$I9FbiQElwRcSq.dZcAhtF.HjkHfqLraH9ojrRJz5Xu4BQvT1uisKW','sahil.khurana@skj.ican.in','Sahil','Khurana',1,'2025-07-25 07:03:54','2025-07-25 07:03:54');
INSERT INTO users_master VALUES(61,'rujuta.renavikar@skj.ican.in','$2b$10$7WRON12i0iLHl/OGIRtAC.rI1H9dLIwhelqHSP0zCWlzbJ232hJl2','rujuta.renavikar@skj.ican.in','Rujuta','Renavikar',1,'2025-07-25 07:03:54','2025-07-25 07:03:54');
INSERT INTO users_master VALUES(62,'saanvi.shaha@skj.ican.in','$2b$10$/OSLMCCSkIEpD7t4VyRq6OI/4aHsm1wzk7sVr6Bqv2hRB9dsMIyv2','saanvi.shaha@skj.ican.in','Saanvi','Saha',1,'2025-07-25 07:03:54','2025-07-25 07:03:54');
INSERT INTO users_master VALUES(63,'anshita.baharani@skj.ican.in','$2b$10$gcFmX2Y0jMFdzNi5m1tKauxLEqqWatCbG1SrNCmj5QrKmW/q5NUIm','anshita.baharani@skj.ican.in','Anshita','Baharani',1,'2025-07-25 07:03:54','2025-07-25 07:03:54');
INSERT INTO users_master VALUES(64,'vanshika.khandelwal@skj.ican.in','$2b$10$40yMh5qYwI9kHxY7McquCOIH3Y1kaxD1nhoRVXAfwq.81yenDga3e','vanshika.khandelwal@skj.ican.in','Vanshika','Khandelwal',1,'2025-07-25 07:03:54','2025-07-25 07:03:54');
INSERT INTO users_master VALUES(65,'diksha.agarwal@skj.ican.in','$2b$10$b0jUJmRqRnS1/6Yko34kHu3XR9sAUNwLRpJ3Ozm/QyaYebQs79eHm','diksha.agarwal@skj.ican.in','Diksha','Agarwal',1,'2025-07-25 07:03:54','2025-07-25 07:03:54');
INSERT INTO users_master VALUES(66,'shriraj.daware@skj.ican.in','$2b$10$lIJDtrJ6PUmN30z94aJjY.2MvMKf89GxeWvPCfqqClDe0LE3EsNoe','shriraj.daware@skj.ican.in','Shriraj','Daware',1,'2025-07-25 07:03:54','2025-07-25 07:03:54');
INSERT INTO users_master VALUES(67,'vishan.shah@skj.ican.in','$2b$10$XoKodNYi.RapudTsL1xS6OMpwtuHFegsr2XwWdEMSp4XNFGi7Blg6','vishan.shah@skj.ican.in','Vishan','Shah',1,'2025-07-25 07:03:54','2025-07-25 07:03:54');
INSERT INTO users_master VALUES(68,'nimish.gadgil@skj.ican.in','$2b$10$sf1UzQ4V/91FIp3FZWGfJ.hBg9Brr3RbYH0hgqh.PoPU4.HgAE/ya','nimish.gadgil@skj.ican.in','Nimish','Gadgil',1,'2025-07-25 07:03:54','2025-07-25 07:03:54');
INSERT INTO users_master VALUES(69,'khushi.sanghvi@skj.ican.in','$2b$10$mjmbb5iJmNZS.lmsA4jm5O05jKpbh.ajKTJ3/O29tTdtsvHIa89J.','khushi.sanghvi@skj.ican.in','Khushi','Sanghvi',1,'2025-07-25 07:03:54','2025-07-25 07:03:54');
CREATE TABLE roles_master (
    role_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO roles_master VALUES(1,'Admin','Administrator with full system access','2025-06-27 07:55:34','2025-06-27 07:55:34');
INSERT INTO roles_master VALUES(2,'User','Standard user with limited access','2025-06-27 07:55:34','2025-06-27 07:55:34');
INSERT INTO roles_master VALUES(3,'full_access','Role with access to all functionality','2025-07-09 09:35:08','2025-07-09 09:35:08');
INSERT INTO roles_master VALUES(7,'Partner','Partner of the organizaiton','2025-07-25 05:42:46','2025-07-25 05:42:46');
INSERT INTO roles_master VALUES(8,'Director','Director to give permissions to others','2025-07-25 05:43:17','2025-07-25 05:43:17');
INSERT INTO roles_master VALUES(9,'Senior Manager','Less permissions','2025-07-25 05:43:39','2025-07-25 05:43:39');
INSERT INTO roles_master VALUES(10,'Manager','Only user permissions','2025-07-25 05:43:54','2025-07-25 05:43:54');
INSERT INTO roles_master VALUES(11,'Article','Articles in the house','2025-07-25 05:44:17','2025-07-25 05:44:17');
INSERT INTO roles_master VALUES(12,'Associate','work with articles to assign tasks','2025-07-25 07:15:37','2025-07-25 07:15:37');
CREATE TABLE permissions_master (
    permission_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO permissions_master VALUES(1,'user_view','Can view user details','2025-06-27 07:55:34','2025-06-27 07:55:34');
INSERT INTO permissions_master VALUES(2,'user_create','Can create users','2025-06-27 07:55:34','2025-06-27 07:55:34');
INSERT INTO permissions_master VALUES(3,'user_edit','Can edit user details','2025-06-27 07:55:34','2025-06-27 07:55:34');
INSERT INTO permissions_master VALUES(4,'user_delete','Can delete users','2025-06-27 07:55:34','2025-06-27 07:55:34');
INSERT INTO permissions_master VALUES(5,'role_view','Can view roles','2025-06-27 07:55:34','2025-06-27 07:55:34');
INSERT INTO permissions_master VALUES(6,'role_create','Can create roles','2025-06-27 07:55:34','2025-06-27 07:55:34');
INSERT INTO permissions_master VALUES(7,'role_edit','Can edit roles','2025-06-27 07:55:34','2025-06-27 07:55:34');
INSERT INTO permissions_master VALUES(8,'role_delete','Can delete roles','2025-06-27 07:55:34','2025-06-27 07:55:34');
INSERT INTO permissions_master VALUES(9,'permission_view','Can view permissions','2025-06-27 07:55:34','2025-06-27 07:55:34');
INSERT INTO permissions_master VALUES(10,'permission_assign','Can assign permissions to roles','2025-06-27 07:55:34','2025-06-27 07:55:34');
INSERT INTO permissions_master VALUES(11,'activity_view','Can view activity logs','2025-07-09 10:11:11','2025-07-09 10:11:11');
INSERT INTO permissions_master VALUES(12,'feature_toggle_view','View feature toggles','2025-07-10 05:00:59','2025-07-10 05:00:59');
INSERT INTO permissions_master VALUES(13,'feature_toggle_edit','Create, edit, or delete feature toggles','2025-07-10 05:00:59','2025-07-10 05:00:59');
INSERT INTO permissions_master VALUES(14,'payment_view','payment_view permission for payment module','2025-07-11 06:24:58','2025-07-11 06:24:58');
INSERT INTO permissions_master VALUES(15,'payment_delete','payment_delete permission for payment module','2025-07-11 06:24:58','2025-07-11 06:24:58');
INSERT INTO permissions_master VALUES(16,'payment_create','payment_create permission for payment module','2025-07-11 06:24:58','2025-07-11 06:24:58');
INSERT INTO permissions_master VALUES(17,'payment_edit','payment_edit permission for payment module','2025-07-11 06:24:58','2025-07-11 06:24:58');
INSERT INTO permissions_master VALUES(18,'route_users_bulk_upload_view','View access for Bulk User Upload','2025-07-25 10:52:11','2025-07-25 10:52:11');
INSERT INTO permissions_master VALUES(19,'route_users_bulk_upload_edit','Edit access for Bulk User Upload','2025-07-25 10:52:11','2025-07-25 10:52:11');
INSERT INTO permissions_master VALUES(20,'route_users_bulk_upload_create','Create access for Bulk User Upload','2025-07-25 10:52:11','2025-07-25 10:52:11');
INSERT INTO permissions_master VALUES(21,'route_users_bulk_upload_delete','Delete access for Bulk User Upload','2025-07-25 10:52:11','2025-07-25 10:52:11');
INSERT INTO permissions_master VALUES(22,'route_roles_feature_toggles_view','View access for Feature Toggle Management','2025-07-25 10:52:11','2025-07-25 10:52:11');
INSERT INTO permissions_master VALUES(23,'route_roles_feature_toggles_edit','Edit access for Feature Toggle Management','2025-07-25 10:52:11','2025-07-25 10:52:11');
INSERT INTO permissions_master VALUES(24,'route_roles_feature_toggles_create','Create access for Feature Toggle Management','2025-07-25 10:52:11','2025-07-25 10:52:11');
INSERT INTO permissions_master VALUES(25,'route_roles_feature_toggles_delete','Delete access for Feature Toggle Management','2025-07-25 10:52:11','2025-07-25 10:52:11');
INSERT INTO permissions_master VALUES(34,'route_post_file_upload_upload','Access to upload files','2025-07-25 11:12:20','2025-07-25 11:12:20');
CREATE TABLE user_roles_tx (
    user_role_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    role_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users_master(user_id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles_master(role_id) ON DELETE CASCADE
);
INSERT INTO user_roles_tx VALUES(1,1,1,'2025-06-27 07:55:34');
INSERT INTO user_roles_tx VALUES(7,7,1,'2025-06-27 09:30:10');
INSERT INTO user_roles_tx VALUES(8,8,2,'2025-06-27 09:30:10');
INSERT INTO user_roles_tx VALUES(9,9,2,'2025-06-27 09:30:10');
INSERT INTO user_roles_tx VALUES(10,10,2,'2025-06-27 09:30:10');
INSERT INTO user_roles_tx VALUES(11,11,2,'2025-06-27 09:30:10');
INSERT INTO user_roles_tx VALUES(12,12,3,'2025-07-09 09:35:08');
INSERT INTO user_roles_tx VALUES(13,13,3,'2025-07-09 10:43:15');
INSERT INTO user_roles_tx VALUES(14,14,1,'2025-07-09 11:11:24');
INSERT INTO user_roles_tx VALUES(15,15,2,'2025-07-09 11:11:24');
INSERT INTO user_roles_tx VALUES(16,16,3,'2025-07-09 11:11:24');
INSERT INTO user_roles_tx VALUES(17,17,1,'2025-07-10 05:07:34');
INSERT INTO user_roles_tx VALUES(18,18,3,'2025-07-10 05:07:34');
INSERT INTO user_roles_tx VALUES(19,19,2,'2025-07-10 05:07:34');
INSERT INTO user_roles_tx VALUES(20,20,8,'2025-07-25 05:46:12');
INSERT INTO user_roles_tx VALUES(21,21,8,'2025-07-25 05:46:12');
INSERT INTO user_roles_tx VALUES(22,22,8,'2025-07-25 05:46:12');
INSERT INTO user_roles_tx VALUES(23,23,8,'2025-07-25 05:46:12');
INSERT INTO user_roles_tx VALUES(24,24,8,'2025-07-25 05:46:12');
INSERT INTO user_roles_tx VALUES(25,25,9,'2025-07-25 05:46:12');
INSERT INTO user_roles_tx VALUES(26,26,9,'2025-07-25 05:46:12');
INSERT INTO user_roles_tx VALUES(27,27,9,'2025-07-25 05:46:12');
INSERT INTO user_roles_tx VALUES(28,28,9,'2025-07-25 05:46:12');
INSERT INTO user_roles_tx VALUES(29,29,9,'2025-07-25 05:46:12');
INSERT INTO user_roles_tx VALUES(30,30,10,'2025-07-25 05:46:12');
INSERT INTO user_roles_tx VALUES(31,31,10,'2025-07-25 05:46:12');
INSERT INTO user_roles_tx VALUES(32,32,10,'2025-07-25 05:46:12');
INSERT INTO user_roles_tx VALUES(33,33,10,'2025-07-25 05:46:13');
INSERT INTO user_roles_tx VALUES(34,34,10,'2025-07-25 05:46:13');
INSERT INTO user_roles_tx VALUES(35,35,11,'2025-07-25 05:46:13');
INSERT INTO user_roles_tx VALUES(36,36,11,'2025-07-25 05:46:13');
INSERT INTO user_roles_tx VALUES(37,37,11,'2025-07-25 05:46:13');
INSERT INTO user_roles_tx VALUES(38,38,11,'2025-07-25 05:46:13');
INSERT INTO user_roles_tx VALUES(39,39,11,'2025-07-25 05:46:13');
INSERT INTO user_roles_tx VALUES(40,40,8,'2025-07-25 07:03:54');
INSERT INTO user_roles_tx VALUES(41,44,11,'2025-07-25 07:03:54');
INSERT INTO user_roles_tx VALUES(42,50,11,'2025-07-25 07:03:54');
INSERT INTO user_roles_tx VALUES(43,52,11,'2025-07-25 07:03:54');
INSERT INTO user_roles_tx VALUES(44,53,11,'2025-07-25 07:03:54');
INSERT INTO user_roles_tx VALUES(45,54,11,'2025-07-25 07:03:54');
INSERT INTO user_roles_tx VALUES(46,55,11,'2025-07-25 07:03:54');
INSERT INTO user_roles_tx VALUES(47,56,11,'2025-07-25 07:03:54');
INSERT INTO user_roles_tx VALUES(48,57,11,'2025-07-25 07:03:54');
INSERT INTO user_roles_tx VALUES(49,42,11,'2025-07-25 07:03:54');
INSERT INTO user_roles_tx VALUES(50,58,10,'2025-07-25 07:03:54');
INSERT INTO user_roles_tx VALUES(51,47,9,'2025-07-25 07:03:54');
INSERT INTO user_roles_tx VALUES(52,62,11,'2025-07-25 07:03:54');
INSERT INTO user_roles_tx VALUES(53,60,11,'2025-07-25 07:03:54');
INSERT INTO user_roles_tx VALUES(54,43,11,'2025-07-25 07:03:54');
INSERT INTO user_roles_tx VALUES(55,48,11,'2025-07-25 07:03:54');
INSERT INTO user_roles_tx VALUES(56,49,11,'2025-07-25 07:03:54');
INSERT INTO user_roles_tx VALUES(57,63,10,'2025-07-25 07:03:54');
INSERT INTO user_roles_tx VALUES(58,45,11,'2025-07-25 07:03:54');
INSERT INTO user_roles_tx VALUES(59,59,7,'2025-07-25 07:03:54');
INSERT INTO user_roles_tx VALUES(60,65,8,'2025-07-25 07:03:54');
INSERT INTO user_roles_tx VALUES(61,66,11,'2025-07-25 07:03:54');
INSERT INTO user_roles_tx VALUES(62,67,11,'2025-07-25 07:03:54');
INSERT INTO user_roles_tx VALUES(63,69,11,'2025-07-25 07:03:54');
INSERT INTO user_roles_tx VALUES(64,68,11,'2025-07-25 07:03:54');
INSERT INTO user_roles_tx VALUES(65,41,12,'2025-07-25 07:16:17');
CREATE TABLE role_permissions_tx (
    role_permission_id INTEGER PRIMARY KEY AUTOINCREMENT,
    role_id INTEGER NOT NULL,
    permission_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES roles_master(role_id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions_master(permission_id) ON DELETE CASCADE
);
INSERT INTO role_permissions_tx VALUES(12,3,10,'2025-07-09 09:35:08');
INSERT INTO role_permissions_tx VALUES(13,3,9,'2025-07-09 09:35:08');
INSERT INTO role_permissions_tx VALUES(14,3,6,'2025-07-09 09:35:08');
INSERT INTO role_permissions_tx VALUES(15,3,8,'2025-07-09 09:35:08');
INSERT INTO role_permissions_tx VALUES(16,3,7,'2025-07-09 09:35:08');
INSERT INTO role_permissions_tx VALUES(17,3,5,'2025-07-09 09:35:08');
INSERT INTO role_permissions_tx VALUES(18,3,2,'2025-07-09 09:35:08');
INSERT INTO role_permissions_tx VALUES(19,3,4,'2025-07-09 09:35:08');
INSERT INTO role_permissions_tx VALUES(20,3,3,'2025-07-09 09:35:08');
INSERT INTO role_permissions_tx VALUES(21,3,1,'2025-07-09 09:35:08');
INSERT INTO role_permissions_tx VALUES(23,3,11,'2025-07-09 10:11:57');
INSERT INTO role_permissions_tx VALUES(24,4,1,'2025-07-09 13:14:21');
INSERT INTO role_permissions_tx VALUES(25,4,5,'2025-07-09 13:14:21');
INSERT INTO role_permissions_tx VALUES(26,5,1,'2025-07-09 13:14:21');
INSERT INTO role_permissions_tx VALUES(27,5,5,'2025-07-09 13:14:21');
INSERT INTO role_permissions_tx VALUES(28,6,1,'2025-07-09 13:14:21');
INSERT INTO role_permissions_tx VALUES(29,6,5,'2025-07-09 13:14:21');
INSERT INTO role_permissions_tx VALUES(36,7,11,'2025-07-25 05:42:46');
INSERT INTO role_permissions_tx VALUES(37,7,10,'2025-07-25 05:42:46');
INSERT INTO role_permissions_tx VALUES(38,7,9,'2025-07-25 05:42:46');
INSERT INTO role_permissions_tx VALUES(39,7,6,'2025-07-25 05:42:46');
INSERT INTO role_permissions_tx VALUES(40,7,8,'2025-07-25 05:42:46');
INSERT INTO role_permissions_tx VALUES(41,7,7,'2025-07-25 05:42:46');
INSERT INTO role_permissions_tx VALUES(42,7,5,'2025-07-25 05:42:46');
INSERT INTO role_permissions_tx VALUES(43,7,2,'2025-07-25 05:42:46');
INSERT INTO role_permissions_tx VALUES(44,7,4,'2025-07-25 05:42:46');
INSERT INTO role_permissions_tx VALUES(45,7,3,'2025-07-25 05:42:46');
INSERT INTO role_permissions_tx VALUES(46,7,1,'2025-07-25 05:42:46');
INSERT INTO role_permissions_tx VALUES(47,8,11,'2025-07-25 05:43:17');
INSERT INTO role_permissions_tx VALUES(48,8,6,'2025-07-25 05:43:17');
INSERT INTO role_permissions_tx VALUES(49,8,8,'2025-07-25 05:43:17');
INSERT INTO role_permissions_tx VALUES(50,8,7,'2025-07-25 05:43:17');
INSERT INTO role_permissions_tx VALUES(51,8,5,'2025-07-25 05:43:17');
INSERT INTO role_permissions_tx VALUES(52,8,2,'2025-07-25 05:43:17');
INSERT INTO role_permissions_tx VALUES(53,8,4,'2025-07-25 05:43:17');
INSERT INTO role_permissions_tx VALUES(54,8,3,'2025-07-25 05:43:17');
INSERT INTO role_permissions_tx VALUES(55,8,1,'2025-07-25 05:43:17');
INSERT INTO role_permissions_tx VALUES(56,9,10,'2025-07-25 05:43:39');
INSERT INTO role_permissions_tx VALUES(57,9,9,'2025-07-25 05:43:39');
INSERT INTO role_permissions_tx VALUES(58,9,6,'2025-07-25 05:43:39');
INSERT INTO role_permissions_tx VALUES(59,9,8,'2025-07-25 05:43:39');
INSERT INTO role_permissions_tx VALUES(60,9,7,'2025-07-25 05:43:39');
INSERT INTO role_permissions_tx VALUES(61,9,5,'2025-07-25 05:43:39');
INSERT INTO role_permissions_tx VALUES(62,9,2,'2025-07-25 05:43:39');
INSERT INTO role_permissions_tx VALUES(63,9,4,'2025-07-25 05:43:39');
INSERT INTO role_permissions_tx VALUES(64,9,3,'2025-07-25 05:43:39');
INSERT INTO role_permissions_tx VALUES(65,9,1,'2025-07-25 05:43:39');
INSERT INTO role_permissions_tx VALUES(66,10,2,'2025-07-25 05:43:54');
INSERT INTO role_permissions_tx VALUES(67,10,4,'2025-07-25 05:43:54');
INSERT INTO role_permissions_tx VALUES(68,10,3,'2025-07-25 05:43:54');
INSERT INTO role_permissions_tx VALUES(69,10,1,'2025-07-25 05:43:54');
INSERT INTO role_permissions_tx VALUES(70,11,1,'2025-07-25 05:44:17');
INSERT INTO role_permissions_tx VALUES(71,12,5,'2025-07-25 07:15:37');
INSERT INTO role_permissions_tx VALUES(72,12,1,'2025-07-25 07:15:37');
INSERT INTO role_permissions_tx VALUES(73,12,3,'2025-07-25 07:15:37');
INSERT INTO role_permissions_tx VALUES(74,12,2,'2025-07-25 07:15:37');
INSERT INTO role_permissions_tx VALUES(92,1,11,'2025-07-25 11:13:01');
INSERT INTO role_permissions_tx VALUES(93,1,13,'2025-07-25 11:13:01');
INSERT INTO role_permissions_tx VALUES(94,1,12,'2025-07-25 11:13:01');
INSERT INTO role_permissions_tx VALUES(95,1,16,'2025-07-25 11:13:01');
INSERT INTO role_permissions_tx VALUES(96,1,15,'2025-07-25 11:13:01');
INSERT INTO role_permissions_tx VALUES(97,1,17,'2025-07-25 11:13:01');
INSERT INTO role_permissions_tx VALUES(98,1,14,'2025-07-25 11:13:01');
INSERT INTO role_permissions_tx VALUES(99,1,10,'2025-07-25 11:13:01');
INSERT INTO role_permissions_tx VALUES(100,1,9,'2025-07-25 11:13:01');
INSERT INTO role_permissions_tx VALUES(101,1,6,'2025-07-25 11:13:01');
INSERT INTO role_permissions_tx VALUES(102,1,8,'2025-07-25 11:13:01');
INSERT INTO role_permissions_tx VALUES(103,1,7,'2025-07-25 11:13:01');
INSERT INTO role_permissions_tx VALUES(104,1,5,'2025-07-25 11:13:01');
INSERT INTO role_permissions_tx VALUES(105,1,34,'2025-07-25 11:13:01');
INSERT INTO role_permissions_tx VALUES(106,1,24,'2025-07-25 11:13:01');
INSERT INTO role_permissions_tx VALUES(107,1,25,'2025-07-25 11:13:01');
INSERT INTO role_permissions_tx VALUES(108,1,23,'2025-07-25 11:13:01');
INSERT INTO role_permissions_tx VALUES(109,1,22,'2025-07-25 11:13:01');
INSERT INTO role_permissions_tx VALUES(110,1,20,'2025-07-25 11:13:01');
INSERT INTO role_permissions_tx VALUES(111,1,21,'2025-07-25 11:13:01');
INSERT INTO role_permissions_tx VALUES(112,1,19,'2025-07-25 11:13:01');
INSERT INTO role_permissions_tx VALUES(113,1,18,'2025-07-25 11:13:01');
INSERT INTO role_permissions_tx VALUES(114,1,2,'2025-07-25 11:13:01');
INSERT INTO role_permissions_tx VALUES(115,1,4,'2025-07-25 11:13:01');
INSERT INTO role_permissions_tx VALUES(116,1,3,'2025-07-25 11:13:01');
INSERT INTO role_permissions_tx VALUES(117,1,1,'2025-07-25 11:13:01');
CREATE TABLE activity_logs_tx (
    activity_log_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    action TEXT NOT NULL,
    details TEXT,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users_master(user_id) ON DELETE SET NULL
);
INSERT INTO activity_logs_tx VALUES(1,7,'LOGIN','User logged in','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36','2025-06-27 17:26:18');
INSERT INTO activity_logs_tx VALUES(2,1,'LOGIN','User logged in','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36','2025-06-27 17:26:50');
INSERT INTO activity_logs_tx VALUES(3,1,'LOGIN','User logged in','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36','2025-06-27 17:35:25');
INSERT INTO activity_logs_tx VALUES(4,7,'LOGIN','User logged in','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36','2025-07-09 07:20:26');
INSERT INTO activity_logs_tx VALUES(5,9,'LOGIN','User logged in','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36','2025-07-09 08:05:12');
INSERT INTO activity_logs_tx VALUES(6,12,'PASSWORD_RESET_REQUEST','Password reset requested','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36','2025-07-09 09:42:05');
INSERT INTO activity_logs_tx VALUES(7,12,'LOGIN','User logged in','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36','2025-07-09 09:43:10');
INSERT INTO activity_logs_tx VALUES(8,1,'LOGIN','User logged in','::1','axios/1.10.0','2025-07-09 11:54:49');
INSERT INTO activity_logs_tx VALUES(9,1,'LOGIN','User logged in','::1','axios/1.10.0','2025-07-09 11:56:27');
INSERT INTO activity_logs_tx VALUES(10,1,'LOGIN','User logged in','::1','curl/8.7.1','2025-07-09 12:05:01');
INSERT INTO activity_logs_tx VALUES(11,1,'LOGIN','User logged in','::1','axios/1.10.0','2025-07-09 13:06:21');
INSERT INTO activity_logs_tx VALUES(12,1,'LOGIN','User logged in','::1','axios/1.10.0','2025-07-09 13:07:03');
INSERT INTO activity_logs_tx VALUES(13,1,'LOGIN','User logged in','::1','curl/8.7.1','2025-07-09 13:13:17');
INSERT INTO activity_logs_tx VALUES(14,1,'LOGIN','User logged in','::1','axios/1.10.0','2025-07-09 13:14:21');
INSERT INTO activity_logs_tx VALUES(15,12,'LOGIN','User logged in','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36','2025-07-09 13:19:35');
INSERT INTO activity_logs_tx VALUES(16,1,'LOGIN','User logged in','::1','curl/8.7.1','2025-07-09 13:22:11');
INSERT INTO activity_logs_tx VALUES(17,1,'LOGIN','User logged in','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36','2025-07-12 06:26:57');
INSERT INTO activity_logs_tx VALUES(18,1,'LOGIN','User logged in','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36','2025-07-15 04:24:54');
INSERT INTO activity_logs_tx VALUES(19,1,'LOGIN','User logged in','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36','2025-07-16 13:41:46');
INSERT INTO activity_logs_tx VALUES(20,1,'LOGIN','User logged in','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36','2025-07-18 10:36:06');
INSERT INTO activity_logs_tx VALUES(21,1,'LOGIN','User logged in','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36','2025-07-25 04:44:09');
INSERT INTO activity_logs_tx VALUES(22,9,'LOGIN','User logged in','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36','2025-07-25 04:45:50');
INSERT INTO activity_logs_tx VALUES(23,1,'LOGIN','User logged in','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36','2025-07-25 05:34:18');
INSERT INTO activity_logs_tx VALUES(24,1,'LOGIN','User logged in','::1','axios/1.10.0','2025-07-25 08:06:21');
INSERT INTO activity_logs_tx VALUES(25,1,'LOGIN','User logged in','::1','axios/1.10.0','2025-07-25 09:30:30');
INSERT INTO activity_logs_tx VALUES(26,1,'LOGIN','User logged in','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36','2025-07-25 09:59:21');
CREATE TABLE payment_qr_codes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    payment_type VARCHAR(50) NOT NULL, -- e.g., 'UPI', 'BANK', 'WALLET'
    image_url VARCHAR(255),   -- File system path to the QR code image
    active BOOLEAN DEFAULT 0, -- Only one QR code can be active at a time
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO payment_qr_codes VALUES(1,'alok',NULL,'UPI','/Users/alokk/EmployDEX/Applications/base_v1/uploads/qr/1752560851519-961037489-Alok QR.jpg',0,'2025-07-15 06:27:31','2025-07-15 06:27:31');
CREATE TABLE payment_transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    qr_code_id INTEGER,
    transaction_ref VARCHAR(100) NOT NULL UNIQUE, -- Unique reference number for the transaction
    user_id INTEGER, -- User who initiated the transaction
    verified BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT NULL,
    FOREIGN KEY (qr_code_id) REFERENCES payment_qr_codes(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS "feature_toggles" (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    feature_name TEXT UNIQUE NOT NULL,
    is_enabled INTEGER NOT NULL DEFAULT 0,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    feature TEXT DEFAULT 'user_management'
);
INSERT INTO feature_toggles VALUES(1,'payment_integration',1,'Enable payment integration with QR code support','2025-07-11 05:42:15','2025-07-11 05:42:15','payment');
INSERT INTO feature_toggles VALUES(2,'route_users_bulk_upload',1,'Feature toggle for Bulk User Upload route','2025-07-25 10:52:37','2025-07-25 10:52:37','user_management');
INSERT INTO feature_toggles VALUES(3,'route_roles_feature_toggles',1,'Feature toggle for Feature Toggle Management route','2025-07-25 10:52:37','2025-07-25 10:52:37','system');
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('roles_master',12);
INSERT INTO sqlite_sequence VALUES('permissions_master',34);
INSERT INTO sqlite_sequence VALUES('role_permissions_tx',117);
INSERT INTO sqlite_sequence VALUES('users_master',69);
INSERT INTO sqlite_sequence VALUES('user_roles_tx',65);
INSERT INTO sqlite_sequence VALUES('activity_logs_tx',26);
INSERT INTO sqlite_sequence VALUES('feature_toggles',3);
INSERT INTO sqlite_sequence VALUES('payment_qr_codes',1);
CREATE INDEX idx_payment_type ON payment_qr_codes(payment_type);
COMMIT;
