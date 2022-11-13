import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";
import client from "../../../libs/server/client";

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	//  await new Promise((resolve) => setTimeout(resolve, 5000));
	if (req.method === "POST") {
		const { body } = req;
		let item;
		if (+body.id === 9999) {
			item = await client.item.create({
				data: {
					name: body.name,
					amount: +body.amount,
					tag: body.tag,
					unit: body.unit,
					minamount: +body.minamount,
					click: body.click,
				},
			});
		} else {
			item = await client.item.update({
				where: {
					id: body.id,
				},
				data: {
					name: body.name,
					amount: +body.amount,
					tag: body.tag,
					unit: body.unit,
					minamount: +body.minamount,
					click: body.click,
				},
			});
		}

		res.json({
			ok: true,
			item,
		});
	}
	if (req.method === "GET") {
		const items = await client.item.findMany();

		if (items) {
			res.json({
				ok: true,
				items,
			});
		}
	}
}

export default withHandler({
	methods: ["GET", "POST"],
	handler,
});
