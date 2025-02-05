from .db_connect import Connection_Database


async def get_db():
    connection = Connection_Database()
    try:
        yield connection
    finally:
        connection.conn.close()