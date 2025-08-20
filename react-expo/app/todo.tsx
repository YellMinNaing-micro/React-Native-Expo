import React, { useState } from "react";
import { Box, Text, Input, InputField, Button } from "@gluestack-ui/themed";
import { FlatList, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function TodoScreen() {
    const [task, setTask] = useState("");
    const [todos, setTodos] = useState<string[]>([]);

    const addTodo = () => {
        if (task.trim()) {
            setTodos([...todos, task]);
            setTask("");
        }
    };

    const removeTodo = (index: number) => {
        setTodos(todos.filter((_, i) => i !== index));
    };

    return (
        <Box flex={1} p="$5">
            <Text size="2xl" mb="$5">My Todo List</Text>

            <Input mb="$3" w="100%">
                <InputField
                    placeholder="Enter new task"
                    value={task}
                    onChangeText={setTask}
                />
            </Input>

            <Button mb="$5" onPress={addTodo}>
                <Text color="white">Add Task</Text>
            </Button>

            <FlatList
                data={todos}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => removeTodo(index)}>
                        <Box p="$3" mb="$2" bg="$backgroundLight200" rounded="$md">
                            <Text>{item}</Text>
                        </Box>
                    </TouchableOpacity>
                )}
            />
        </Box>
    );
}
