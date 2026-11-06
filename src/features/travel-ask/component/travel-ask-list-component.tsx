import { EyeIcon, Pen01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import { Card, CardContent } from "#/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "#/components/ui/table";
import { TravelAskDeleteButtonComponent } from "#/features/travel-ask/component/travel-ask-delete-button-component";
import { orpc } from "#/orpc/client";

export function TravelAskListComponent() {
	const query = useSuspenseQuery(
		orpc.travelAsk.getTravelAskList.queryOptions(),
	);
	const items = query.data ?? [];

	return (
		<Card className="w-full">
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>标题</TableHead>
							<TableHead>作者</TableHead>
							<TableHead>地点</TableHead>
							<TableHead>浏览</TableHead>
							<TableHead>点赞</TableHead>
							<TableHead>创建时间</TableHead>
							<TableHead className="text-right">操作</TableHead>
							<TableHead className="text-right">预览</TableHead>
							<TableHead className="text-right">删除</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{items.map((item) => (
							<TableRow key={item.id}>
								<TableCell className="font-medium">{item.title}</TableCell>
								<TableCell>{item.author}</TableCell>
								<TableCell>{item.address ?? "-"}</TableCell>
								<TableCell>{item.views}</TableCell>
								<TableCell>{item.like}</TableCell>
								<TableCell>
									{new Date(item.createdAt).toLocaleString("zh-TW")}
								</TableCell>
								<TableCell className="text-right">
									<Button
										size="sm"
										render={
											<Link
												to="/admin/travel-ask/edit/$id"
												params={{ id: item.id }}
											/>
										}
									>
										<HugeiconsIcon icon={Pen01Icon} data-icon="inline-start" />
										编辑
									</Button>
								</TableCell>
								<TableCell className="text-right">
									<Button
										size="sm"
										render={
											<Link
												to="/travel-ask/view/$id"
												params={{ id: item.id }}
											/>
										}
									>
										<HugeiconsIcon icon={EyeIcon} data-icon="inline-start" />
										预览
									</Button>
								</TableCell>
								<TableCell className="text-right">
									<TravelAskDeleteButtonComponent id={item.id} />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
