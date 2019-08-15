CREATE TABLE
IF NOT EXISTS tb_sensors_data
(id VARCHAR (100) PRIMARY KEY, 
id_sensor VARCHAR (30), 
temperature FLOAT (10), 
humidity FLOAT (10), 
ozone FLOAT (10), 
pm25 FLOAT (10), 
carbon_monoxide FLOAT (10), 
colected_at VARCHAR (100),
received_at VARCHAR (100));