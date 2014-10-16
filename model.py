import web
import datetime

db = web.database (dbn="mysql", db="shopnet", user="root", passwd="Fritz")

### Site DB/Table Methods

def get_sites():
    return db.select ("Site", order="id")

def get_sites_for_user(userid):
    return db.select ("Site", where="user_id=$userid", vars=locals())

def get_site(id):
    return db.select ("Site", where="id=$id", vars=locals())

def new_site(data):
    name = data['name']
    user_id = data['user_id']
    
    new_id = db.insert("Site",
                       name=name,
                       user_id=user_id)
    return new_id

def update_site(data):
    new_name = data['name']
    new_temp_sp = data['temp_sp']

    sites = db.update("Site", where="id=$data['id']", name = new_name, temp_sp = new_temp_sp, vars=locals())
    
    if sites == 1:
        return True
    else:
        return False

def delete_site(id):
    db.delete("Site", where="id=$id", vars=locals())

def update_site_temp_avg(data):
    '''
    `data` is a Datapoint JSON representation from a weathernode Arduino
    We need to:
       1. determine which `node` this datapoint belongs to
       2. determine which `site` this datapoint's node belongs to
       3. fetch the latest temp from each node in that site
       4. calculate the average temperature across all nodes for the site
       5. set that avgerage temp as the site's temp_avg1
    '''
    # 1. Determine which `node` this datapoint belongs to
    # 2. Determine which `site` this `node` belongs to
    macaddr  = data['macaddr']
    '''
    Get the node that corresponds to the given macaddr
    This returns a list/array, but there should only be a single node
    '''
    node_list  = db.select ("Node", where="macaddr=$macaddr",vars=locals())
    for node in node_list:
        site_id = node.site_id
    
    # 3. Fetch the latest temp from each node in that site
    '''
    Get all of the nodes that belong to the site given by site_id above
    '''
    temp_sum = 0
    latest_datapoints = []
    node_list = db.select ("Node", where="site_id=$site_id", vars=locals())
    for node in node_list:
        datapoints = db.select("Datapoint", where="node_id=$node_id", order="id DESC", limit="1", vars=locals())
        for datapoint in datapoints:
            latest_datapoints.append(datapoint)
    for datapoint in latest_datapoints:
        temp_sum += datapoint.temp
        
    new_temp_avg = float(temp_sum / (len(latest_datapoints) * 1.0))

    update_success = db.update ("Site", where="id=$site_id", temp_avg = new_temp_avg, vars=locals())
    
    if update_success == 1:
        return True
    else:
        return False
    
### Node DB/Table Methods

def get_nodes():
    return db.select ("Node", order="id")
    
def get_node(id):
    return db.select ("Node", where="id=$id", vars=locals())

def get_nodes_for_site(site_id):
    return db.select ("Node", where="site_id=$site_id", vars=locals())

def new_node(data):
    new_id = db.insert("Node",
                       macaddr=data['macaddr'],
                       node_location=data['node_location'],
                       lat=data['lat'],
                       lon=data['lon'],
                       site_id=data['site_id'])
    return new_id

def delete_node(id):
    db.delete ("Node", where="id=$id", vars=locals())

### Datapoint DB/Table Methods

def get_datapoints():
    return db.select ("Datapoint", order="id DESC")

def get_datapoints_for_node(node_id):
    return db.select ("Datapoint", where="node_id=$node_id", order="id DESC", vars=locals())

def new_datapoint(data):
    macaddr  = data['macaddr']
    '''
    Get the node_id that corresponds to the given macaddr
    '''
    node_id_list  = db.select ("Node", where="macaddr=$macaddr",vars=locals())
    for node in node_id_list:
	node_id=node.id	
    '''
    db.select() returns a container.
    Each line contains a dictionary that the db has returned.
    Use var.value rather than var['value']. NR
    '''	
    timestamp = str(datetime.datetime.now())

    humidity = float(data['humidity']) / 10.0
    temp     = float(data['temp']) / 10.0
    pressure = float(data['pressure']) / 10.0
    light    = float(data['light']) / 10.0

    new_id = db.insert ("Datapoint",
                        node_id=node_id,
                        temp=temp,
                        pressure=pressure,
                        humidity=humidity,
                        timestamp=timestamp,
                        light=light)
    return new_id

### User DB/Table Methods

def get_users():
    return db.select ("User", order="id")

def new_user(data):
    username  = data['username']
    email     = data['email']
    privilege = data['privilege']
    password  = data['password']

    new_id = db.insert ("User",
                        username=username,
                        email=email,
                        privilege=privilege,
                        password=password)

    return new_id

def check_login_values(user, passwd):
    users = db.select("User", where="username=$user AND password=$passwd",
                      vars=locals())
    if len(users) > 0:
        return True
    else:
        return False

def get_logged_in_user(user, passwd):
    return db.select("User", where="username=$user AND password=$passwd",
                     vars=locals())
