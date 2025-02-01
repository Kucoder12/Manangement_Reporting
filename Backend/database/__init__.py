from base_de_datos import Connection_Database


async def get_db():
    try:
        connection = Connection_Database()
    finally:
        connection.conn.close()